interface BudgetItemProps {
  budget: BudgetListItem; // Make sure BudgetItem component expects BudgetListItem as the type of the budget prop
}

const BudgetItem = ({ budget }: BudgetItemProps) => {
  return (
    <>
      <div className="flex-between px-3 py-3">
        <div className="flex-center gap-3  ">
          <h2 className="bg-primary-100 rounded-full p-2 px-3 w-10 h-10">
            {budget.pickEmoji}
          </h2>
          <div className="flex-col p-semibold-14 ">
            <h2>{budget.name}</h2>
            <h2>{budget.totalItem} Items</h2>
          </div>
        </div>
        <h2 className="p-semibold-20 text-bluey-400">{`\u20AC${budget.amount}`}</h2>
      </div>
      {/* progess bar */}
      <div className="mt-2">
        <div className="px-5">
          <h2 className="text-bluey-400 p-semibold-18">{`\u20AC${Number(budget.totalSpend) ? Number(budget.totalSpend) : 0}`}</h2>
          <h2 className="text-bluey-400 p-semibold-18">{`\u20AC${Number(budget.amount)-Number(budget.totalSpend)}`}</h2>
        </div>
        <div className=" bg-grey-100 h-2 rounded-full">
          <div className="bg-primary w-[30%] h-2 rounded-full"></div>
        </div>
      </div>
    </>
  );
};
export default BudgetItem;
