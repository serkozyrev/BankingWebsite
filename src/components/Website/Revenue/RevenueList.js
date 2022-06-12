import React, { useEffect, useContext } from "react";

import AuthContext from "../../context/auth-context";
import RevenueItem from "./RevenueItem";

import "./RevenueList.css";

const RevenueList = (props) => {
  const authCtx = useContext(AuthContext);
  // const [revenuesList, setRevenuesList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/revenues`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      authCtx.setRevenuesList(responseData.revenues);
    };
    try {
      fetchMovies().catch((error) => {});
    } catch (err) {}
  }, []);

  return (
    <>
      <ul className="revenue-list">
        <h3 className="revenue-list h3">Revenue for all accounts</h3>
        <div className="revenue-list items">
          {authCtx.revenuesList &&
            authCtx.revenuesList.map((revenue) => (
              <RevenueItem
                key={revenue.id}
                id={revenue.id}
                title={revenue.description}
                amount={revenue.amount}
                day={revenue.day}
                month={revenue.month}
                year={revenue.year}
                type={revenue.type}
              />
            ))}
        </div>
      </ul>
    </>
  );
};

export default RevenueList;
