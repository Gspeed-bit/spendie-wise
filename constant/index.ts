import { LiaPiggyBankSolid } from "react-icons/lia";
import { GiUpgrade, GiTakeMyMoney } from "react-icons/gi";
import { TbLayoutGridAdd } from "react-icons/tb";
import { useRouter } from "next/navigation";


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


