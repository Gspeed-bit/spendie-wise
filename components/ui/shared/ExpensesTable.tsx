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
import { toast } from "sonner";
import { formattedEventDate } from "@/constant";
import Image from "next/image";

const ExpensesTable = () => {
  const { user } = useUser();
  const [expensesListDisplay, setExpensesListDisplay] = useState<
    ExpensesListItem[]
  >([]);
  const [eventCreated, setEventCreated] = useState(false);
  const [expensesListInfo, setExpensesListInfo] = useState<ExpensesListItem[]>(
    []
  );
  useEffect(() => {
    getAllExpenses();
  }, []); // Fetch expenses when component mounts

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

  const handleDeleteExpense = async (expenseId: number) => {
    try {
      // Delete expense from database
      const response = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expenseId))
        .returning();

      if (response) {
        toast("Expenses has been deleted", {
          description: formattedEventDate,
        });
        // Refresh budget information
        getAllExpenses();
      }
      // Update expensesList state by filtering out the deleted expense
      setExpensesListInfo((prevExpensesList) =>
        prevExpensesList.filter((expense) => expense.id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className=" p-5 mt-5 border shadow-sm rounded-xl">
      <h2 className="text-center h5-bold">list of your Expenses.</h2>
      <Table className="mt-5">
        <TableCaption className=""></TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead>Created By</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expenses</TableHead>
            <TableHead className="">Date/Time</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesListDisplay.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{user ? user.fullName : expense.createdAt}</TableCell>
              <TableCell>{`\u20AC ${expense.amount}`}</TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell>{expense.createdAt}</TableCell>
              <TableCell className="">
                <Image
                  onClick={() => handleDeleteExpense(expense.id)}
                  src={"/icons/trash.svg"}
                  alt={"logo"}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ExpensesTable;
