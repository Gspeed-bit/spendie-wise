import Image from "next/image";
import piggyBankSvg from "./piggy-bank.svg"; // Import the SVG file

type BudgetListProps = {
  budgetList: BudgetListItem[];
};

const CardInfo = ({ budgetList }: BudgetListProps) => {
  const totalBudget = budgetList.reduce(
    (total, item) => total + item.amount,
    0
  );
  const totalSpent = budgetList.reduce(
    (total, item) => total + item.totalSpend,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10  ">
      <div className="border p-medium-16 rounded-xl bg-primary-100 flex-between p-5 w-full gap-10 ">
        <div className="space-y-2">
          <h2>Total Spent</h2>
          {/* Displaying the total budget */}
          <h2 className="text-xl font-extrabold">{`\u20AC${totalSpent}`}</h2>
        </div>
        {/* Displaying the piggy bank SVG image */}
        <div className="bg-bluey-300 p-3  w-10 h-10 flex-center rounded-full">
          <Image
            src="/icons/spent.svg"
            alt="Piggy Bank"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="border p-medium-16 rounded-xl bg-primary-100 flex-between p-5 w-full gap-10 ">
        <div className="space-y-2">
          <h2>Total Budget</h2>
          {/* Displaying the total budget */}
          <h2 className="text-xl font-extrabold">{`\u20AC${totalBudget}`}</h2>
        </div>
        {/* Displaying the piggy bank SVG image */}
        <div className="bg-bluey-300 p-3  w-10 h-10 flex-center rounded-full">
          <Image
            src="/icons/piggyBankSvg.svg"
            alt="Piggy Bank"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="border p-medium-16 rounded-xl bg-primary-100 flex-between p-5 w-full gap-10 ">
        <div className="space-y-2">
          <h2>No. of Budgets</h2>
          {/* Displaying the total budget */}
          <h2 className="text-xl font-extrabold">{budgetList?.length}</h2>
        </div>
        {/* Displaying the piggy bank SVG image */}
        <div className="bg-bluey-300 p-3  w-10 h-10 flex-center rounded-full">
          <Image
            src="/icons/budgetno.svg"
            alt="Piggy Bank"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
