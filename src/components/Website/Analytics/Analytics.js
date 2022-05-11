import React, { useState, useEffect } from "react";

import Card from "../../UI/Card/Card";

import "./Analytics.css";
import AnalyticsItem from "./AnalyticsItem";

const Analytics = () => {
  const [infoAnalysis, setInfoAnalysis] = useState([]);
  const [infoAnalysisMine, setInfoAnalysisMine] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/analysis_info`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setInfoAnalysis(responseData.infoDina.info);
      setInfoAnalysisMine(responseData.infoPapa.info);
    };
    try {
      fetchMovies().catch((error) => {});
    } catch (err) {}
  }, []);
  return (
    <div className="analysis-container">
      <Card className="analysis">
        <h3>Chequing/Line Expenses</h3>
        <div className="container">
          {infoAnalysisMine &&
            infoAnalysisMine.map((info) => (
              <AnalyticsItem
                key={info.id}
                infoSummary={info.summary}
                amount={info.amount}
                title={info.title}
                year={info.year}
                type={info.type}
              />
            ))}
        </div>
      </Card>
      <Card className="analysis">
        <h3>Visa Expenses</h3>
        <div className="container">
          {infoAnalysis &&
            infoAnalysis.map((info) => (
              <AnalyticsItem
                key={info.id}
                infoSummary={info.summary}
                amount={info.amount}
                title={info.title}
                year={info.year}
                type={info.type}
              />
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
