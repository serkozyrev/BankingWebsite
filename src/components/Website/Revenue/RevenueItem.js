import React, { useState, useEffect, useContext } from "react";

import Card from "../../UI/Card/Card";
import RecordDate from "../RecordDate";

import "./RevenueItem.css";
import AuthContext from "../../context/auth-context";
import Button from "../../UI/Button/Button";

const RevenueItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [mouseInside, setMouseInside] = useState(false);
  const [monthDate, setMonthDate] = useState("");
  let date = new Date(props.year, monthDate, props.day);
  const type = "revenue";
  const mouseEnter = () => {
    setMouseInside(true);
  };
  const mouseLeave = () => {
    setMouseInside(false);
  };

  useEffect(() => {
    setMonthDate(props.month - 1);
  }, [props.day, props.year, props.month, monthDate]);

  return (
    <li>
      <Card className="revenue-item">
        <RecordDate date={date} />
        <div
          className="revenue-item__description"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <h2 className="revenue-item h2">{props.title}</h2>
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
                  inverse
                  to={`/edit/${props.id}&${type}`}
                >
                  {" "}
                  Редактировать{" "}
                </Button>
              ) : (
                " "
              )}{" "}
            </div>
          </div>
          <div className="revenue-item__price-info">
            {mouseInside ? (
              <Button
                className="revenue_delete"
                onClick={() => authCtx.deleteEntry(props.id, type)}
                inverse
              >
                X
              </Button>
            ) : null}
            <div className="revenue-item__price">{props.amount} руб</div>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default RevenueItem;
