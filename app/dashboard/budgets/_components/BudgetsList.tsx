import CreateBudget from "./CreateBudget"

const BudgetsList = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {" "}
        <CreateBudget />
      </div>
    </div>
  );
}
export default BudgetsList