"use client"

import { eq, getTableColumns, sql } from "drizzle-orm";
import CreateBudget from "./CreateBudget"
import { Budgets, Expenses } from "@/db/schema";
import { db } from "@/utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {

const [budgetList, setbudgetList] = useState<BudgetListItem[]>([]);

const {user}= useUser();
useEffect(() => {
  user  && getBudgetList();
}, [user]);


  // use to get budget list
  const getBudgetList = async()=>{
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
      .groupBy(Budgets.id);
    //Updates the budgetList state variable with the fetched data.
    setbudgetList(result);
    console.log(result);
  }


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CreateBudget />
        {budgetList.map((budget,index)=>(
          <div key={index} className="bg-white shadow-md p-4 rounded-md">
            <BudgetItem budget={budget}/>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BudgetList;