import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";

const Search = () => {
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="In development"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default Search;
