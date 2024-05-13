import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as BarTooltip,
  Legend as BarLegend,
  CartesianGrid,
  LabelList,
} from "recharts";

type BudgetListProps = {
  budgetList: BudgetListItem[];
};

const ChartDashboard: React.FC<BudgetListProps> = ({ budgetList }) => {
  // Define data for both charts
  const data = budgetList.map((item) => ({
    name: item.name,
    budget: item.amount,
    spend: item.totalSpend,
  }));

  // Define colors
  const colors = [
    "#DB3F29",
    "#03081B",
    "#212B50",
    "#D7A449",
    "#E8E2D8",
    "#D14F68",
    "#7148FC",
  ];

  return (
    <div className="flex flex-col flex-center md:flex-row">
      {/* Pie Chart */}
     <div className="mb-4">
        <PieChart width={400} height={200}>
          <Pie
            data={data}
            dataKey="budget"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`pie-cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          {/* Add Tooltip to display information */}
          <Tooltip />
          {/* Add Legend */}
   
          <Legend
            formatter={(value, entry) =>
              `${entry.payload?.name}`
            }
          />
        </PieChart>
     </div>

      {/* Bar Chart */}
      <BarChart width={500} height={300} data={data}>
       
        <XAxis dataKey="name" />
        <YAxis />
        <BarTooltip />
  
        <BarLegend />
        <Bar dataKey="budget" name="Budget" fill={colors[0]}>
          <LabelList dataKey="budget" position="top" />
        </Bar>
        <Bar dataKey="spend" name="Spend" fill={colors[1]}>
          <LabelList dataKey="spend" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
};

export default ChartDashboard;
