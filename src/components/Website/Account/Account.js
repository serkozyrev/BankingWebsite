import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth-context";
import Card from "../../UI/Card/Card";

import "./Account.css";
import AccountDate from "./AccountDate";

const Account = (props) => {
  const authCtx = useContext(AuthContext);
  const [currencyRate, setCurrencyRate] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=1"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setCurrencyRate(responseData.observations[0].FXUSDCAD.v);
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
  return (
    <div>
      <div className="account-container">
        <div className="date">
          <AccountDate />
          <div className="currency-expense">
            Chequing expenses for this month {authCtx.expenseTotalPapa} cad
          </div>
          <div className="currency">1 usd - {currencyRate} cad </div>

          <div className="currency-expense">
            Visa Expenses for this month {authCtx.expenseTotalDina} cad
          </div>
          <div></div>
          <div className="currency-expense">
            Line of Credit expenses this month {authCtx.expenseTotalSnezhana}{" "}
            cad
          </div>
        </div>
        <Card className="account-item">
          <div className="account-item__description">
            <h2 className="account-item h2">Visa</h2>
            <div className="account-item__price">
              {authCtx.accountBalanceDina} руб
            </div>
          </div>
        </Card>
        <Card className="account-item">
          <div className="account-item__description">
            <h2 className="account-item h2">Chequing</h2>
            <div className="account-item__price">
              {authCtx.accountBalanceMine} руб
            </div>
          </div>
        </Card>
        <Card className="account-item">
          <div className="account-item__description">
            <h2 className="account-item h2">Line of Credit</h2>
            <div className="account-item__price">
              {authCtx.accountBalanceSnezhana} руб
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Account;
