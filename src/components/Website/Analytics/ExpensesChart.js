import React from "react";
import Chart from "./Chart/Chart";

// const dummy_expenses = [
//   {
//     id: "e1",
//     title: "Car Insurance",
//     amount: 294.67,
//     date: new Date(2020, 1, 28),
//   },
//   { id: "e2", title: "Toilet paper", amount: 4.67, date: new Date(2021, 3, 8) },
//   {
//     id: "e3",
//     title: "Seneca semester tuition",
//     amount: 3294.67,
//     date: new Date(2019, 4, 28),
//   },
// ];

const ExpensesChart = (props) => {
  // const [expenses, setExpenses] = useState(dummy_expenses);
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of props.items) {
    const expenseMonth = expense.month - 1;
    chartDataPoints[expenseMonth].value += expense.amount;
  }
  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
