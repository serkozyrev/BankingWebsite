import React, { useState, useContext } from "react";

import AuthContext from "../context/auth-context";
import Button from "../UI/Button/Button";
import "./NewRecord.css";

const NewRecord = (props) => {
  const authCtx = useContext(AuthContext);
  const [providedAmount, setProvidedAmount] = useState("");
  const [validatedAmount, setValidAmount] = useState();
  const [providedDescription, setProvidedDescription] = useState("");
  const [validatedDescription, setValidDescription] = useState();
  const [providedType, setProvidedType] = useState("");
  const [validatedType, setValidType] = useState();
  const [providedCategory, setProvidedCategory] = useState("");
  const [validatedCategory, setValidCategory] = useState();
  const [providedDate, setProvidedDate] = useState("");
  const [validatedDate, setValidDate] = useState();
  const [providedAccount, setProvidedAccount] = useState("");
  const [validatedAccount, setValidAccount] = useState();

  const amountHandler = (event) => {
    setProvidedAmount(event.target.value);
  };

  const validateAmountHandler = () => {
    setValidAmount(providedAmount !== "");
  };

  const dateHandler = (event) => {
    setProvidedDate(event.target.value);
  };

  const validateDateHandler = () => {
    setValidDate(providedDate !== "");
  };

  const descriptionHandler = (event) => {
    setProvidedDescription(event.target.value);
  };

  const validateDescriptionHandler = () => {
    setValidDescription(providedDescription !== "");
  };

  const typeHandler = (event) => {
    setProvidedType(event.target.value);
  };

  const validateTypeHandler = () => {
    setValidType(providedType !== "");
  };

  const categoryHandler = (event) => {
    setProvidedCategory(event.target.value);
  };

  const validateCategoryHandler = () => {
    setValidCategory(providedCategory !== "");
  };

  const accountHandler = (event) => {
    setProvidedAccount(event.target.value);
  };

  const validateAccountHandler = () => {
    setValidAccount(providedAccount !== "");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newrecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: providedType,
          description: providedDescription,
          date: providedDate,
          category: providedCategory,
          amount: providedAmount,
          rate: authCtx.currencyRate,
          accounttype: providedAccount,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          props.dataFunc(data.message);

          authCtx.closeModal();
          props.infoBool();
          authCtx.setExpensesList(data.expensesPapa);
          authCtx.setExpensesListDina(data.expensesDina);
          authCtx.setRevenuesList(data.revenues);
          authCtx.totalSum(data.total);
          authCtx.totalSumDina(data.totalDina);
          authCtx.totalSumSnezhana(data.totalSnezhana);
          authCtx.setAccountBalanceDina(data.dina_balance);
          authCtx.setAccountBalanceMine(data.my_balance);
          authCtx.setAccountBalanceSnezhana(data.snezhana_balance);
        });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mt-5 text-center">
        <h2>New Record into Account</h2>
        <p>
          Please select revenue or expense and add description to this record.
          When you finish, press Save. All fields should be filled.
        </p>
        <div className="d-flex justify-content-center">
          <div className="col-8 mb-4 mt-3">
            <div
              className={`control ${
                validatedType === false ? "invalid" : "check"
              }`}
            >
              <h6 className="form-label" htmlFor="description">
                Type of record
              </h6>
              <select
                id="gender"
                className="form-select field"
                value={providedType}
                onChange={typeHandler}
                onBlur={validateTypeHandler}
                required
              >
                <option defaultValue>Choose...</option>
                <option value="revenue">Revenue</option>
                <option value="expense">Expense</option>
              </select>
              {validatedType === false && (
                <p className="error-check">Please select type of transaction</p>
              )}
            </div>
            {providedType === "revenue" && (
              <div>
                <div
                  className={`control ${
                    validatedDate === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="date">
                    Record Date
                  </h6>
                  <input
                    type="date"
                    className="form-select field"
                    id="date"
                    name="date"
                    value={providedDate}
                    onChange={dateHandler}
                    onBlur={validateDateHandler}
                    min="2018-01-01"
                    max="2099-12-31"
                  />
                  {validatedDate === false && (
                    <p className="error-check">Please select record's date</p>
                  )}
                </div>
                <div
                  className={`control ${
                    validatedCategory === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="category">
                    Revenue category
                  </h6>
                  <select
                    id="gender"
                    className="form-select field"
                    value={providedCategory}
                    onChange={categoryHandler}
                    onBlur={validateCategoryHandler}
                    required
                  >
                    <option defaultValue>Choose...</option>
                    <option value="pensionPapa">Deposit Chequeing</option>
                    <option value="pensionDina">Deposit Visa</option>
                  </select>
                  {validatedCategory === false && (
                    <p className="error-check">
                      Please, choose type of revenue category
                    </p>
                  )}
                </div>
                <div
                  className={`control ${
                    validatedAmount === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="amount">
                    Record Amount{" "}
                  </h6>
                  <input
                    type="number"
                    id="amount"
                    className="form-control field"
                    value={providedAmount}
                    onChange={amountHandler}
                    onBlur={validateAmountHandler}
                  />
                  {validatedAmount === false && (
                    <p className="error-check">
                      Please, enter amount for record
                    </p>
                  )}
                </div>
                <div
                  className={`control ${
                    validatedDescription === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="description">
                    Description{" "}
                  </h6>
                  <textarea
                    rows="3"
                    id="description"
                    className="form-control field"
                    value={providedDescription}
                    onChange={descriptionHandler}
                    onBlur={validateDescriptionHandler}
                  />
                  {validatedDescription === false && (
                    <p className="error-check">
                      Please, enter description for record
                    </p>
                  )}
                </div>
              </div>
            )}
            {providedType === "expense" && (
              <div>
                <div
                  className={`control ${
                    validatedDate === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="description">
                    Record Date
                  </h6>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-select field"
                    value={providedDate}
                    onChange={dateHandler}
                    onBlur={validateDateHandler}
                    min="2018-01-01"
                    max="2099-12-31"
                  />
                  {validatedDate === false && (
                    <p className="error-check">Please select record's date</p>
                  )}
                </div>
                <div
                  className={`control ${
                    validatedAccount === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="description">
                    Type of Account
                  </h6>
                  <select
                    id="gender"
                    className="form-select field"
                    value={providedAccount}
                    onChange={accountHandler}
                    onBlur={validateAccountHandler}
                    required
                  >
                    <option defaultValue>Choose...</option>
                    <option value="DinaAccount">Visa</option>
                    <option value="PapaAccount">Chequing</option>
                    <option value="SnezhanaAccount">Line of Credit</option>
                  </select>
                  {validatedAccount === false && (
                    <p className="error-check">
                      Please, select type of account
                    </p>
                  )}
                </div>
                <div
                  className={`control ${
                    validatedCategory === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="description">
                    Type of expense
                  </h6>
                  <select
                    id="gender"
                    className="form-select field"
                    value={providedCategory}
                    onChange={categoryHandler}
                    onBlur={validateCategoryHandler}
                    required
                  >
                    <option defaultValue>Choose...</option>
                    <option value="grocery">Grocery</option>
                    <option value="moneySend">
                      Transfer to Visa from Chequing
                    </option>
                    <option value="utilitiesPayment">Utilities</option>
                    <option value="otherPayment">Other Payments</option>
                    <option value="moneySendSnezhana">
                      transfer to Line of Credit
                    </option>
                    <option value="medicine">Medicine</option>
                  </select>
                  {validatedCategory === false && (
                    <p className="error-check">
                      Please, select type of expense
                    </p>
                  )}
                </div>

                <div
                  className={`control ${
                    validatedAmount === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="amount">
                    Record Amount{" "}
                  </h6>
                  <input
                    type="number"
                    id="amount"
                    step=".01"
                    className="form-control field"
                    value={providedAmount}
                    onChange={amountHandler}
                    onBlur={validateAmountHandler}
                  />
                  {validatedAmount === false && (
                    <p className="error-check">Please, enter record amount</p>
                  )}
                </div>
                <div
                  className={`control ${
                    validatedDescription === false ? "invalid" : "check"
                  }`}
                >
                  <h6 className="form-label" htmlFor="description">
                    Description{" "}
                  </h6>
                  <textarea
                    rows="3"
                    id="description"
                    className="form-control field"
                    value={providedDescription}
                    onChange={descriptionHandler}
                    onBlur={validateDescriptionHandler}
                  />
                  {validatedDescription === false && (
                    <p className="error-check">
                      Please, enter record description
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-5 d-flex justify-content-center">
        <Button type="submit" className="btn login mb-4">
          Save
        </Button>
      </div>
    </form>
  );
};

export default NewRecord;
