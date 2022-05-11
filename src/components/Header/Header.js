import React, { useContext, useState } from "react";
import { Nav, Container, Navbar } from "react-bootstrap";

import "./Header.css";

import AuthContext from "../context/auth-context";
import Modal from "../UI//Modal/Modal";
import NewRecord from "./NewRecord";
import Search from "./Search";

const Header = (props) => {
  const [dataInfo, setDataInfo] = useState("");
  const [infoAfterMessage, setInfoAfterMessage] = useState(false);
  const authCtx = useContext(AuthContext);

  const newRecordHandler = () => {
    authCtx.showModal();
  };

  const dataInformation = (data) => {
    setDataInfo(data);
  };

  const showCloseModalHandler = () => {
    setInfoAfterMessage(!infoAfterMessage);
  };
  return (
    <Navbar className="navigation" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Home Bookkeeping</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              type="button"
              className="forgot_pass d-flex justify-content-start"
              onClick={newRecordHandler}
            >
              New Record
            </Nav.Link>
            <Nav.Link
              type="button"
              href="/analysis"
              className="forgot_pass d-flex justify-content-start"
            >
              Analytics
            </Nav.Link>
          </Nav>
          <Search />
        </Navbar.Collapse>
      </Container>
      {authCtx.popupIsShown && (
        <Modal
          onClose={authCtx.closeModal}
          info={
            <NewRecord
              rate={props.rateNumber}
              dataFunc={dataInformation}
              infoBool={showCloseModalHandler}
            />
          }
        />
      )}
      {infoAfterMessage && authCtx.popupIsShown === false && (
        <Modal onClose={showCloseModalHandler} info={dataInfo} time />
      )}
    </Navbar>
  );
};

export default Header;
