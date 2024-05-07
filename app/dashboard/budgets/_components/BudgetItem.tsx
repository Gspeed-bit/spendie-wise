   import Link from 'next/link';


const BudgetItem = ({ budget }: BudgetItemProps) => {
  return (


<Link href={`/dashboard/expenses/${budget.id}`}>
  <div className="flex-between px-3 py-3">
    <div className="flex-center gap-3">
      <h2 className="bg-bluey-100 rounded-full p-2 px-3 w-15 h-15">
        {budget.pickEmoji}
      </h2>
      <div className="flex-col p-medium-14">
        <h2 className="p-semibold-20">{budget.name}</h2>
        <h2>{budget.totalItem} Items</h2>
      </div>
    </div>
    <h2 className="p-semibold-20 text-primary-600">{`\u20AC${budget.amount}`}</h2>
  </div>
  {/* progress bar */}
  <div className="mt-2">
    <div className="px-3 flex-between text-grey-200 text-xs pb-2">
      <h2>{`\u20AC${Number(budget.totalSpend) ? Number(budget.totalSpend) : 0} Spent`}</h2>
      <h2>{`\u20AC${Number(budget.amount) - Number(budget.totalSpend)} Remaining`}</h2>
    </div>
    <div className="bg-grey-100 h-2 rounded-full">
      <div className="bg-primary w-[30%] h-2 rounded-full"></div>
    </div>
  </div>
</Link>

  );
};
export default BudgetItem;
