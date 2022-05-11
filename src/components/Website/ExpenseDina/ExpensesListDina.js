import React, { useEffect, useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import AuthContext from "../../context/auth-context";

import "./ExpensesList.css";

const ExpensesListDina = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/expenses`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      authCtx.setExpensesListDina(responseData.expensesDina);
      authCtx.setExpensesList(responseData.expensesPapa);
      authCtx.totalSum(responseData.total);
      authCtx.totalSumDina(responseData.totalDina);
      authCtx.totalSumSnezhana(responseData.totalSnezhana);
    };
    try {
      fetchMovies().catch((error) => {});
    } catch (err) {}
  }, []);

  return (
    <ul className="expenses-list">
      <h3 className="expenses-list h3">Visa Expenses</h3>
      <div className="expenses-list items">
        {authCtx.expensesListDina &&
          authCtx.expensesListDina.map((expense) => (
            <ExpenseItem
              key={expense.id}
              id={expense.id}
              title={expense.description}
              amount={expense.amount}
              day={expense.day}
              month={expense.month}
              dollars={expense.amountindollar}
              year={expense.year}
              rate={authCtx.currencyRate}
              category={expense.category}
              type={expense.type}
            />
          ))}
      </div>
    </ul>
  );
};

export default ExpensesListDina;
