import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import AuthContext from "../context/auth-context";

const Search = (props) => {
  const authCtx = useContext(AuthContext);
  const [providedSearch, setProvidedSearch] = useState("");

  const searchHandler = (event) => {
    setProvidedSearch(event.target.value);
  };

  if (providedSearch === "") {
    authCtx.setSearchSelected(false);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(providedSearch);
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: providedSearch,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          authCtx.setSearchSelected(true);
          authCtx.setSearchExpenses(data.expenses);
          authCtx.setSearchExpenseDina(data.dinaExpense);
        });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <FormControl
        type="search"
        placeholder="Expense Description"
        className="me-2"
        aria-label="Search"
        value={providedSearch}
        onChange={searchHandler}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default Search;
