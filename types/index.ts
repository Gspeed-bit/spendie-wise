type sideBarProps = {
  icon: React.ComponentType<any>
  text: string;
  url:string
};



type budgetTypesProps = {
  name: string;
  amount: string;
  pickEmoji: string;
};

type BudgetListItem = {
  totalSpend: number;
  totalItem: number;
  id: number;
  name: string;
  amount: string;
  pickEmoji: string | null;
  createdBy: string;
}


type BudgetItemProps = {
  budget: BudgetListItem; 
};



type expensesTypesProps = {
  name: string;
  amount: string;
};



type ExpensesListItem = {
  id: number;
  name: string;
  amount: string | number;
  createdAt: string;
  budgetId: number | null;

};

type ExpensesItemProps = {
  expenses: ExpensesListItem;
};