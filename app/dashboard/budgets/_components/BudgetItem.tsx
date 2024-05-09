import Link from "next/link";

const BudgetItem = ({ budget }: BudgetItemProps) => {
  const calculateProgressBarPercentage = () => {
    if (Number(budget.amount) === 0) return 0; // Avoid division by zero
    const percentage = (budget.totalSpend / Number(budget.amount)) * 100;
    return percentage;
  };

  return (
    <Link href={`/dashboard/expenses/${budget.id}`}>
      <div className="flex-between px-1 py-5 ">
        <div className="flex flex-between gap-3">
          <h2 className="bg-bluey-100 rounded-full p-2 px-3 w-10 h-10">
            {budget.pickEmoji}
          </h2>
          <div className="flex-col p-medium-14">
            <h2 className="p-semibold-20 md:p-medium-14 xl:p-semibold-20">
              {budget.name}
            </h2>
            <h2>{budget.totalItem} Items</h2>
          </div>
        </div>
        <h2 className="p-semibold-20 md:p-medium-16 xl:p-semibold-20 text-primary-600">{`\u20AC${budget.amount}`}</h2>
      </div>
      {/* progress bar */}
      <div className="mt-2">
        <div className="px-3 flex-between text-grey-200 text-xs pb-2">
          <h2>{`\u20AC${
            Number(budget.totalSpend) ? Number(budget.totalSpend) : 0
          } Spent`}</h2>
          <h2>{`\u20AC${
            Number(budget.amount) - Number(budget.totalSpend)
          } Remaining`}</h2>
        </div>

        {/* progress bar percentage */}
        <div className="bg-grey-100 h-2 rounded-full">
          <div className={`h-2 rounded-full ${calculateProgressBarPercentage() >= 90 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${calculateProgressBarPercentage()}%` }}></div>
      </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
