"use client";
import { Budgets, Expenses } from "@/db/schema";
import { db } from "@/utils/dbConfig";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const Page = () => {
  const { user } = useUser();
  const [expensesListDisplay, setExpensesListDisplay] = useState<
    ExpensesListItem[]
  >([]);
 const [eventCreated, setEventCreated] = useState(false);


  useEffect(() => {
    getAllExpenses();
 
  }, []);   // Fetch expenses when component mounts

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
          budgetId: Expenses.budgetId,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(
          eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        )
        .orderBy(desc(Expenses.id));

      // Convert amount from string to number
      const expensesList = result.map((expense) => ({
        ...expense,
        amount: parseFloat(expense.amount),
      }));

      setExpensesListDisplay(expensesList);
        
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className="mx-4 p-5">
      <p className="h3-bold">My Expenses</p>
      <div className="mt-10 ">
        <h2 className="text-center h3-bold">A list of your Expenses.</h2>
        <Table className="mt-5">
          <TableCaption className="p-medium-14">Expenses List.</TableCaption>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Expenses</TableHead>
              <TableHead className="">Date/Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expensesListDisplay.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>
                  {user ? user.fullName : expense.createdAt}
                </TableCell>
                <TableCell>{`\u20AC ${expense.amount}`}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell>{expense.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="p-medium-20">
                Total
              </TableCell>
              <TableCell className="p-medium-14">
                {/* Render total amount here */}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Page;
