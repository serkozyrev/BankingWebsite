import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import "./App.css";
import ExpensesWebsite from "./components/Website/ExpensesWebsite";
import EditRecord from "./components/Website/EditRecord";
import Analytics from "./components/Website/Analytics/Analytics";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<ExpensesWebsite />} />
        <Route path="/edit/:rid&:type" element={<EditRecord />} />
        <Route path="analysis" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default App;
