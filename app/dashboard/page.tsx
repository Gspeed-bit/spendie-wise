"use client";
import CardInfo from "@/components/ui/shared/CardInfo";

import { desc, eq, getTableColumns, sql } from "drizzle-orm";

import { Budgets, Expenses } from "@/db/schema";
import { db } from "@/utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ChartDashboard from "@/components/ui/shared/ChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";

const page = () => {
  const { user, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true); // Loading state for CardInfo component

  const [budgetList, setbudgetList] = useState<BudgetListItem[]>([]);
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  // use to get budget list
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      //Executes a database query to select data from the Budgets table, joining with the Expenses table, filtering by the current user's email address, and grouping by budget ID.
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || "")
      )
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id)); //used to arrange the budgets
    //Convert the "amount" property to number
    const budgets = result.map((budget) => ({
      ...budget,
      amount: Number(budget.amount),
    }));

    //Updates the budgetList state variable with the fetched data.
    setbudgetList(budgets);
    setLoading(false);
  };

  return (
    <div className="text-start m-5 md:m-10">
      {isSignedIn ? (
        <span className="h5-bold bg-gradient-to-r from-bluey-400 via-primary-500 to-primary-600 bg-clip-text font-extrabold text-transparent">
          {`Welcome ${user.fullName}`}
          <br />
          <span className="p-medium-16 text-bluey-300">
            Here's what's happening with your money. Let's manage your expenses
            together.
          </span>
        </span>
      ) : (
        <span className="bg-gradient-to-r from-bluey-400 via-primary-500 to-primary-600 bg-clip-text font-extrabold text-transparent h3-bold">
          Welcome...
        </span>
      )}

      {/* Conditionally render CardInfo or loading state */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="border p-medium-16 rounded-xl bg-primary-100 flex-between p-5 gap-10 animate-pulse"
            >
              <div className="">
                <h2 className="h5-bold"></h2>
                {/* Displaying the total budget */}
                <h2 className="h5-bold"></h2>
              </div>
              {/* Displaying the piggy bank SVG image */}
              <div className="bg-bluey-300 p-3 w-12 h-12 flex-center rounded-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <CardInfo budgetList={budgetList} />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4  mt-10">
            <div className="col-span-1 md:col-span-2">
              <ChartDashboard budgetList={budgetList} />
            </div>
            <div className="border rounded-xl md:p-2  grid gap-3 col-span-1 ">
              <h1 className="h5-bold text-center pt-5 font-bold">Latest Budgets</h1>
              {budgetList.map((budget, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl m-3 p-4 border shadow-md"
                >
                  <BudgetItem budget={budget} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default page;
