"use client";
import { useUser } from "@clerk/nextjs";
import { DashboardHeader } from "@/components/ui/shared/dashboardHeader";
import SideMenu from "@/components/ui/shared/sideMenu";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { Budgets } from "@/db/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The component checks if a user has any budgets created
  const { user } = useUser();

  // The useEffect hook is used to call the checkIfUserHasBudgets function
  // whenever the user object changes
  useEffect(() => {
    // If the user object exists, call the checkIfUserHasBudgets function
    user && checkIfUserHasBudgets();
  }, [user]);
const router = useRouter();
  // The checkIfUserHasBudgets function queries the database to retrieve
  // all budgets created by the current user
  const checkIfUserHasBudgets = async () => {
    // The query selects all records from the Budgets table where the
    // createdBy field matches the user's primary email address
    const email = user?.primaryEmailAddress?.emailAddress ?? "";
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, email));

    // If the result is empty, redirect the user to the budget creation page
    if (result && result.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed md:w-64 hidden md:block z-40 shadow-md min-h-screen">
        <SideMenu />
      </div>
      <main className="flex-1 md:ml-64 ml-0">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}
