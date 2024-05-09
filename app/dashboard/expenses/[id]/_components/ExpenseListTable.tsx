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
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
interface ExpensesListProps {
  expensesListInfo: ExpensesListItem[];
  totalSpend: number;
}

const ExpenseListTable = ({
  expensesListInfo,
  totalSpend,
}: ExpensesListProps) => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="mt-10 ">
      <h2 className="text-center h3-bold ">A list of your Expenses.</h2>
      <Table className="mt-5">
        <TableCaption className="p-medium-14">Expenses List.</TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expenses</TableHead>
            <TableHead className="">Date/Time</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesListInfo.map((List) => (
            <TableRow key={List.id}>
              <TableCell className="font-medium">{List.id}</TableCell>
              <TableCell>{user ? user.fullName : List.createdAt}</TableCell>
              <TableCell>{`\u20AC ${List.amount}`}</TableCell>
              <TableCell>{List.name}</TableCell>
              <TableCell>{List.createdAt}</TableCell>
              <TableCell className="">
                <Image
                  src={"/icons/trash.svg"}
                  alt={"logo"}
                  width={20}
                  height={20}
                  className=""
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="p-medium-20">
              Total
            </TableCell>
            <TableCell className="text-right p-medium-20">
              {`\u20AC ${totalSpend !== null ? totalSpend : 0}`}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
export default ExpenseListTable;
