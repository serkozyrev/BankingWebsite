import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [popupIsShown, setpopupIsShown] = useState(false);
  const [messageIsShown, setMessageIsShown] = useState(false);
  const [currencyRate, setCurrencyRate] = useState("");
  const [expenseTotalPapa, setExpenseTotalPapa] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [expensesListDina, setExpensesListDina] = useState([]);
  const [revenuesList, setRevenuesList] = useState([]);
  const [accountBalanceMine, setAccountBalanceMine] = useState("");
  const [accountBalanceDina, setAccountBalanceDina] = useState("");
  const [accountBalanceSnezhana, setAccountBalanceSnezhana] = useState("");
  const [expenseTotalDina, setExpenseTotalDina] = useState(0);
  const [expenseTotalSnezhana, setExpenseTotalSnezhana] = useState(0);
  const [approveDeletion, setApproveDeletion] = useState(false);

  const rateHandler = (data) => {
    setCurrencyRate(data);
  };

  const totalSum = (data) => {
    setExpenseTotalPapa(data);
  };

  const totalSumSnezhana = (data) => {
    setExpenseTotalSnezhana(data);
  };

  const totalSumDina = (data) => {
    setExpenseTotalDina(data);
  };

  const showModalHandler = () => {
    setpopupIsShown(true);
  };

  const closeModalHandler = () => {
    setpopupIsShown(false);
  };

  const showMessageHandler = () => {
    setMessageIsShown(true);
  };

  const closeMessageHandler = () => {
    setMessageIsShown(false);
  };

  const deletionConfirmHandler = () => {
    setApproveDeletion(true);
    closeMessageHandler();
  };

  const copyPreviousEntry = (id, type) => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/copyrecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          type: type,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setExpensesList(data.expensesPapa);
          setExpensesListDina(data.expensesDina);
          setRevenuesList(data.revenues);
          totalSum(data.total);
          totalSumDina(data.totalDina);
          totalSumSnezhana(data.totalSnezhana);
          setAccountBalanceDina(data.dina_balance);
          setAccountBalanceMine(data.my_balance);
          setAccountBalanceSnezhana(data.snezhana_balance);
        });
    } catch (e) {
      alert(e.message);
    }
  };

  const deleteEntry = (id, type) => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deleterecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          type: type,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setExpensesList(data.expensesPapa);
          setExpensesListDina(data.expensesDina);
          setRevenuesList(data.revenues);
          totalSum(data.total);
          totalSumDina(data.totalDina);
          totalSumSnezhana(data.totalSnezhana);
          setAccountBalanceDina(data.dina_balance);
          setAccountBalanceMine(data.my_balance);
          setAccountBalanceSnezhana(data.snezhana_balance);
          setApproveDeletion(false);
        });
    } catch (e) {
      alert(e.message);
    }
  };

  const contextValue = {
    deleteTask: deletionConfirmHandler,
    messageIsShown,
    approveDeletion,
    showMessage: showMessageHandler,
    closeMessage: closeMessageHandler,
    currencyRate,
    expenseTotalPapa,
    expenseTotalDina,
    expenseTotalSnezhana,
    rateHandler,
    totalSum,
    totalSumDina,
    totalSumSnezhana,
    setExpensesList,
    setExpensesListDina,
    setRevenuesList,
    copyPreviousEntry,
    deleteEntry,
    revenuesList,
    expensesList,
    expensesListDina,
    popupIsShown,
    accountBalanceDina,
    accountBalanceMine,
    accountBalanceSnezhana,
    setAccountBalanceDina,
    setAccountBalanceMine,
    setAccountBalanceSnezhana,
    showModal: showModalHandler,
    closeModal: closeModalHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
