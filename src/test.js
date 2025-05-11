import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const ExpenseChart = ({ data }) => {
  const [key, setKey] = useState(0); // Key to trigger re-render and animation
  const chartData = Object.values(
    data.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || { name: item.category, value: 0 };
      acc[item.category].value += item.amount;
      return acc;
    }, {})
  );

  // Effect to change key when data changes (on page load or login)
  useEffect(() => {
    setKey(prevKey => prevKey + 1); // Changing the key will reset and trigger animation
  }, [data]);

  return (
    <div className="w-full h-[24rem] p-4 bg-white rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            key={key} // Use key to trigger re-render and animation
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label
            isAnimationActive={true}       // enables animation
            animationBegin={0}             // start delay in ms
            animationDuration={800}        // duration in ms
            animationEasing="ease-out"     // easing function
            startAngle={90}                // initial rotation angle (set to 90 for a more dynamic start)
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
