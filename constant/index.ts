import { LiaPiggyBankSolid } from "react-icons/lia";
import { GiUpgrade, GiTakeMyMoney } from "react-icons/gi";
import { TbLayoutGridAdd } from "react-icons/tb";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/db/schema";
import { useUser } from "@clerk/nextjs";

export const sideBar: sideBarProps[] = [
  {
    icon: TbLayoutGridAdd,
    url: "/dashboard",
    text: "Dashboard",
  },
  {
    icon: LiaPiggyBankSolid,
    url: "/dashboard/budgets",
    text: "Budgets",
  },
  {
    icon: GiTakeMyMoney,
    url: "/dashboard/expenses",
    text: "Expenses",
  },
  {
    icon: GiUpgrade,
    url: "/dashboard/upgrade",
    text: "Upgrade",
  },
];


// Get the current date and time
const currentDate = new Date();

// Create a new Date object for the desired date and time
const eventDate = new Date();

// Format the date and time
export const formattedEventDate = eventDate.toLocaleString("de-DE", {
  weekday: "long",
  month: "long",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});


