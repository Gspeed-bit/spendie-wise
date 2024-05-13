"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const DashboardHeader = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  useEffect(() => {
    // When the selected option changes, navigate to the corresponding route
    if (selectedOption.toLowerCase()=== "dashboard"){
      router.push(`/dashboard`);
    } else{
    router.push(`/dashboard/${selectedOption.toLowerCase()}`);
    }
  }, [selectedOption]);

  return (
    <div className="p-4 sticky top-0 bg-white flex-between shadow-sm z-99">
      <div>
        <div>
          <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">
              Tab
            </label>

            <select
              id="Tab"
              className="w-full rounded-md "
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="Dashboard">Dashboard</option>
              <option value="Budgets">Budgets</option>
              <option value="Expenses">Expenses</option>
              <option value="Upgrade">Upgrade</option>
            </select>
          </div>

          <div className="hidden sm:block">
            <div className="">
              <nav className="-mb-px flex gap-6" aria-label="Tabs">
                <Link href={"/"}>
                  <Image src="/logo.png" width={30} height={30} alt="Logo" />
                </Link>
                <Link
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600 dark:border-sky-400 dark:text-sky-300"
                  aria-current="page"
                  href={"/dashboard"}
                >
                  Dashboard
                </Link>

                <Link
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
                  href={"/dashboard/budgets"}
                >
                  Budgets
                </Link>

                <Link
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
                  href={"/dashboard/expenses"}
                >
                  Expenses
                </Link>
                <Link
                  className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
                  href={"/dashboard/upgrade"}
                >
                  Upgrade
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isSignedIn ? (
          <span className="flex items-center gap-x-3">
            <UserButton />
            <span className="text-sm font-medium text-gray-700">
              {user.fullName}
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
};
