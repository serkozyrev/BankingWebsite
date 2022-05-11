import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "../context/auth-context";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import ConfirmMessage from "./ConfirmMessage";
import "./EditRecord.css";

const EditRecord = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useNavigate();
  const [providedAmount, setProvidedAmount] = useState("");
  const [validatedAmount, setValidAmount] = useState();
  const [providedDescription, setProvidedDescription] = useState("");
  const [validatedDescription, setValidDescription] = useState();
  const [providedCategory, setProvidedCategory] = useState("");
  const [validatedCategory, setValidCategory] = useState();
  const [providedDate, setProvidedDate] = useState("");
  const [validatedDate, setValidDate] = useState();

  const recordId = useParams().rid;
  const recordType = useParams().type;

  const editamountHandler = (event) => {
    setProvidedAmount(event.target.value);
  };

  const editvalidateAmountHandler = () => {
    setValidAmount(providedAmount !== "");
  };

  const editdateHandler = (event) => {
    setProvidedDate(event.target.value);
  };

  const editvalidateDateHandler = () => {
    setValidDate(providedDate !== "");
  };

  const editdescriptionHandler = (event) => {
    setProvidedDescription(event.target.value);
  };

  const editvalidateDescriptionHandler = () => {
    setValidDescription(providedDescription !== "");
  };

  const editcategoryHandler = (event) => {
    setProvidedCategory(event.target.value);
  };

  const editvalidateCategoryHandler = () => {
    setValidCategory(providedCategory !== "");
  };

  if (authCtx.approveDeletion) {
    console.log(recordId, recordType);
    authCtx.deleteEntry(recordId, recordType);
    history(`/`);
  }

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/get_by_id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: recordId,
              type: recordType,
            }),
          }
        );
        const res = await responseData.json();
        if (res.expense) {
          setProvidedAmount(res.expense.amount);
          setProvidedDescription(res.expense.description);
          setProvidedCategory(res.expense.category);
        } else if (res.revenue) {
          setProvidedAmount(res.revenue.amount);
          setProvidedDescription(res.revenue.description);
          setProvidedCategory(res.revenue.category);
        }
        let date;
        if (res.expense) {
          if (res.expense.month < 10) {
            date =
              res.expense.year +
              "-0" +
              res.expense.month +
              "-" +
              res.expense.day;
          } else {
            date =
              res.expense.year +
              "-" +
              res.expense.month +
              "-" +
              res.expense.day;
          }
          setProvidedDate(date);
        } else if (res.revenue) {
          if (res.revenue.month < 10) {
            date =
              res.revenue.year +
              "-0" +
              res.revenue.month +
              "-" +
              res.revenue.day;
          } else {
            date =
              res.revenue.year +
              "-" +
              res.revenue.month +
              "-" +
              res.revenue.day;
          }
          setProvidedDate(date);
        }
      } catch (err) {}
    };
    fetchPlace();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/editrecord`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: recordId,
          type: recordType,
          description: providedDescription,
          date: providedDate,
          category: providedCategory,
          amount: providedAmount,
          rate: authCtx.currencyRate,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
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
      history(`/`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Card className="editing">
      <form onSubmit={submitHandler}>
        <div className="mt-5 text-center">
          <h2>Edit Existing Record</h2>
          <p>
            Please select revenue or expense and add description to this record.
            When you finish, press Save. All fields should be filled.
          </p>
          <div className="d-flex justify-content-center">
            <div className="col-8 mb-4 mt-3">
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
                  onChange={editdateHandler}
                  onBlur={editvalidateDateHandler}
                  min="2018-01-01"
                  max="2099-12-31"
                />
                {validatedDate === false && (
                  <p className="error-check">Please select record's date</p>
                )}
              </div>
              {recordType === "revenue" && (
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
                    onChange={editcategoryHandler}
                    onBlur={editvalidateCategoryHandler}
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
              )}
              {recordType === "expense" && (
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
                    onChange={editcategoryHandler}
                    onBlur={editvalidateCategoryHandler}
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
              )}
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
                  onChange={editamountHandler}
                  onBlur={editvalidateAmountHandler}
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
                  onChange={editdescriptionHandler}
                  onBlur={editvalidateDescriptionHandler}
                />
                {validatedDescription === false && (
                  <p className="error-check">
                    Please, enter record description
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5 d-flex justify-content-center">
          <Button type="submit" className="btn login mb-4">
            Save
          </Button>
          <Button className="btn login mb-4" to={"/"}>
            Cancel
          </Button>
          <Button
            className="btn login mb-4"
            onClick={authCtx.showMessage}
            type="button"
          >
            Delete
          </Button>
        </div>

        {authCtx.messageIsShown && (
          <Modal
            onClose={authCtx.closeMessage}
            info={<ConfirmMessage infoBool={authCtx.deleteTask} />}
          />
        )}
      </form>
    </Card>
  );
};

export default EditRecord;
