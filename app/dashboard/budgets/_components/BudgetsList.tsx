"use client"

import { desc, eq, getTableColumns, sql } from "drizzle-orm";
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
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))//used to arrange the budgets
    //Updates the budgetList state variable with the fetched data.
    setbudgetList(result);
  }


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 m-2">
        <CreateBudget refreshData={()=>getBudgetList()} />
        {budgetList.length>0?budgetList.map((budget,index)=>(
          <div key={index} className="bg-white shadow-md p-4 rounded-md">
            <BudgetItem budget={budget}/>
          </div>
        )):[1,2,3,4,5,6,7,8].map((items,index)=>(
          <div key={index}>
            <div className="bg-white shadow-md p-4 rounded-md animate-pulse">
              <div className="flex-between px-3 py-3">
                <div className="flex-center gap-3  ">
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
                  <div className="bg-primary w-[30%] h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BudgetList;