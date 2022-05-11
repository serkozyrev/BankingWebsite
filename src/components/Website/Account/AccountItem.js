import React from "react";

import Card from "../UI/Card/Card";

import "./AccountItem.css";

const AccountItem = (props) => {
  return (
    <Card className="account-item">
      <div className="account-item__description">
        <h2 className="account-item h2">{props.title}</h2>
        <div className="account-item__price">{props.amount}руб</div>
      </div>
    </Card>
  );
};

export default AccountItem;
