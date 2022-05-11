import React, { useContext } from "react";
import AuthContext from "../context/auth-context";
import Button from "../UI/Button/Button";

const ConfirmMessage = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <h3>Вы действительно хотите удалить запись?</h3>
      <Button onClick={props.infoBool}>Подтвердить</Button>
      <Button onClick={authCtx.closeMessage}>Отменить</Button>
    </>
  );
};

export default ConfirmMessage;
