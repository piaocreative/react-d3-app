import React from "react";
import { PieChart } from "../../../components/d3/PieChart";

interface Props {
  company_id: string;
}

export const UNGoals: React.FC<Props> = ({ company_id }) => {
  const score = 0.7648;

  return (
    <div className="my-3 text-center">
      <h2 className="subtitle">UN Sustainability Goals</h2>
      <div className="m-2 text-center relative">
        <div className="border-t absolute top-1/2 left-0 right-0 border-gray-300 dark:border-gray-700"></div>
        <div className="relative">
          <PieChart
            prefix="pie_goals"
            label="Goals Met"
            scale={score}
            max={17}
            color={score < 0.5 ? "#e15759" : "#4e79a7"}
          />
        </div>
      </div>
    </div>
  );
};
