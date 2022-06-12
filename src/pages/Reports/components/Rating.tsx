import React, { useEffect, useState, useContext } from "react";
import { getCompanyScores } from "../../../api/getCompanyScores";
import { PieChart } from "../../../components/d3/PieChart";
import { TopicContext } from "../../../context/TopicContext";
import { TypeCompanyScores } from "../../../types/TypeCompany";
import { calcScore } from "../../../utils/Report";

interface Props {
  company_id: string;
  topic: string;
}

export const Rating: React.FC<Props> = ({ company_id, topic }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCompanyScores(company_id, topic, "").then((response) => {
      setData(response.data);
    });
  }, [company_id, topic]);

  const scores = data ? (data as TypeCompanyScores).data : [];
  const score =
    Math.round(calcScore(scores.length ? scores[0].score : 0)) / 100;
  const { report_topic, setReportTopic } = useContext(TopicContext);

  return (
    <div className="m-2">
      <PieChart
        prefix={`pie_${topic.toLowerCase()}`}
        label={topic}
        scale={score}
        color={score < 0.5 ? "#e15759" : "#4e79a7"}
        type={topic}
        active_type={report_topic}
        setActiveType={setReportTopic}
      />
    </div>
  );
};
