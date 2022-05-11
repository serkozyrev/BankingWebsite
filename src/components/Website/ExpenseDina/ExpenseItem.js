import React, { useState, useEffect, useContext } from "react";

import "./ExpenseItem.css";
import Card from "../../UI/Card/Card";
import RecordDate from "../RecordDate";
import AuthContext from "../../context/auth-context";
import Button from "../../UI/Button/Button";

function ExpenseItem(props) {
  const authCtx = useContext(AuthContext);
  let month = props.month - 1;
  let date = new Date(props.year, month, props.day);
  const type = "expense";
  const [containword, setContainWord] = useState(false);
  const [mouseInside, setMouseInside] = useState(false);

  const mouseEnter = () => {
    setMouseInside(true);
  };
  const mouseLeave = () => {
    setMouseInside(false);
  };
  useEffect(() => {
    if (
      props.category.includes("moneySend") &&
      props.category !== "undefined"
    ) {
      setContainWord(true);
    }
  }, [props]);

  return (
    <li>
      <Card className="expense-item">
        <RecordDate date={date} />
        <div
          className="expense-item__description"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <h2 className="expense-item h2">{props.title}</h2>
          <div className="button-appear">
            <div>
              {" "}
              {mouseInside ? (
                <Button
                  className="login"
                  onClick={() => authCtx.copyPreviousEntry(props.id, type)}
                  inverse
                >
                  {" "}
                  Копировать{" "}
                </Button>
              ) : (
                " "
              )}{" "}
            </div>
            <div>
              {" "}
              {mouseInside ? (
                <Button
                  className="login"
                  to={`/edit/${props.id}&${type}`}
                  inverse
                >
                  {" "}
                  Редактировать{" "}
                </Button>
              ) : (
                " "
              )}{" "}
            </div>
          </div>

          <div className="expense-item__price-info">
            <div className="expense-item__price">{props.amount} руб</div>

            {containword && (
              <div className="expense-item__price">{props.dollars} cad</div>
            )}
          </div>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
