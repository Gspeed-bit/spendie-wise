"use client";
import { useEffect, useState } from "react";
import { and } from "drizzle-orm";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "./_components/AddExpenses";

interface BudgetItemProps {
  budget: BudgetListItem; // Make sure BudgetItem component expects BudgetListItem as the type of the budget prop
}

const ExpenseDashboard = ({ params }: { params: any }) => {
  const [budgetInfo, setBudgetInfo] = useState<BudgetListItem | null>(null); // Initialize with null or single BudgetListItem

  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user,params]);

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(
          and(
            eq(
              Budgets.createdBy,
              user?.primaryEmailAddress?.emailAddress || ""
            ),
            eq(Budgets.id, params.id)
          )
        )
        .groupBy(Budgets.id);
      console.log(result);
      setBudgetInfo(result[0]);
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  return (
    <div className="p-5 ">
      <p className=" h3-bold ">Expenses</p>

      <div className=" pt-5 grid grid-cols-1 md:grid-cols-2 gap-2 mt-10 w-full  ">
        <div>
          {budgetInfo ? (
            <p className="border rounded-xl bg-white shadow-md p-4 pb-8 px-3">
              <BudgetItem budget={budgetInfo} />
            </p>
          ) : (
            <div className="bg-white shadow-md p-4 rounded-md animate-pulse">
              <div className="flex-between px-3 py-3">
                <div className="flex-center gap-3 ">
                  <h2 className="bg-bluey-100 rounded-full p-2 px-3 w-15 h-15"></h2>
                  <div className="flex-col p-medium-14 ">
                    <h2 className="p-semibold-20"></h2>
                    <h2></h2>
                  </div>
                </div>
                <h2 className="p-semibold-20 text-primary-600"></h2>
              </div>
              <div className="mt-2">
                <div className="px-3 flex-between text-grey-200 text-xs pb-2 ">
                  <h2 className=""></h2>
                  <h2 className=" "></h2>
                </div>
                <div className=" bg-grey-100 h-2 rounded-full">
                  <div className="bg-primary w-[50%] h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="">
          <AddExpenses />
        </div>
      </div>
    </div>
  );
};
export default ExpenseDashboard;
