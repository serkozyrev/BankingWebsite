import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";

import "./Account.css";
import AccountDate from "./AccountDate";

const LIST_OF_CUR = [
  "CAD",
  "BRL",
  "AUD",
  "RUB",
  "CNY",
  "EUR",
  "HKD",
  "INR",
  "IDR",
  "JPY",
  "MYR",
  "MXN",
  "NZD",
  "NOK",
  "PEN",
  "SAR",
  "SGD",
  "ZAR",
  "KRW",
  "SEK",
  "SEK",
  "TWD",
  "THB",
  "TRY",
  "GBP",
  "USD",
];

const Account = (props) => {
  const authCtx = useContext(AuthContext);
  const [currencyRate, setCurrencyRate] = useState("");
  const [changeFrom, setChangeFrom] = useState("USD");
  const [changeTo, setChangeTo] = useState("CAD");
  let currency;
  const changeFromHandler = (event) => {
    setChangeFrom(event.target.value);
  };

  const changeToHandler = (event) => {
    setChangeTo(event.target.value);
  };

  useEffect(() => {
    currency = changeFrom + changeTo;
    const fetchMovies = async () => {
      const response = await fetch(
        `https://www.bankofcanada.ca/valet/observations/FX${currency}/json?recent=1`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      let currencyWord = `FX${currency}`;
      console.log(currencyWord);
      setCurrencyRate(responseData.observations[0][currencyWord].v);
    };

    try {
      fetchMovies().catch((error) => {});
    } catch (err) {}
  }, [currencyRate]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/account`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      authCtx.setAccountBalanceDina(responseData.dina_balance);
      authCtx.setAccountBalanceMine(responseData.my_balance);
      authCtx.setAccountBalanceSnezhana(responseData.snezhana_balance);
    };

    try {
      fetchMovies().catch((error) => {});
    } catch (err) {}
  }, []);
  authCtx.rateHandler(currencyRate);

  const submitHandler = async (event) => {
    event.preventDefault();
    currency = changeFrom + changeTo;
    const response = await fetch(
      `https://www.bankofcanada.ca/valet/observations/FX${currency}/json?recent=1`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    let currencyWord = `FX${currency}`;
    console.log(currencyWord);
    setCurrencyRate(responseData.observations[0][currencyWord].v);
  };
  return (
    <div className="account-container">
      <div className="date">
        <AccountDate />
        <div className="currency-expense">
          Chequing expenses for this month ${authCtx.expenseTotalPapa} cad
        </div>
        <div className="currency">
          1 {changeFrom.toLowerCase()} - {currencyRate} {changeTo.toLowerCase()}{" "}
        </div>

        <div className="currency-expense">
          Visa Expenses for this month ${authCtx.expenseTotalDina} cad
        </div>
        <div className="select-currency">
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="currency-box">
                <select
                  id="gender"
                  className="form-select field"
                  value={changeFrom}
                  onChange={changeFromHandler}
                >
                  {LIST_OF_CUR.map((currency) => (
                    <option value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <div className="currency-box">
                <select
                  id="gender"
                  className="form-select field col-sm-3"
                  value={changeTo}
                  onChange={changeToHandler}
                >
                  {LIST_OF_CUR.map((currency) => (
                    <option value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" d-flex justify-content-center">
              <Button type="submit" className="btn login mb-4">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="currency-expense">
          Line of Credit expenses this month ${authCtx.expenseTotalSnezhana} cad
        </div>
      </div>
      <Card className="account-item">
        <div className="account-item__description">
          <h2 className="account-item h2">Visa</h2>
          <div className="account-item__price">
            ${authCtx.accountBalanceDina} cad
          </div>
        </div>
      </Card>
      <Card className="account-item">
        <div className="account-item__description">
          <h2 className="account-item h2">Chequing</h2>
          <div className="account-item__price">
            ${authCtx.accountBalanceMine} cad
          </div>
        </div>
      </Card>
      <Card className="account-item">
        <div className="account-item__description">
          <h2 className="account-item h2">Line of Credit</h2>
          <div className="account-item__price">
            ${authCtx.accountBalanceSnezhana} cad
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Account;
