import React, { useEffect, useState } from "react";
import { getCompanyTopics } from "../../../api/getCompanyTopics";
import { Rating } from "./Rating";

interface Props {
  company_id: string;
}

export const Ratings: React.FC<Props> = ({ company_id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCompanyTopics(company_id).then((response) => {
      setData(response.data);
    });
  }, [company_id]);

  const topics = data ? (data as string[]) : [];

  return (
    <div className="my-3 text-center">
      <h2 className="subtitle">ESG Ratings</h2>
      {!!topics.length && (
        <div className="relative">
          <div className="border-t absolute top-1/2 left-0 right-0 border-gray-300 dark:border-gray-700"></div>
          <div className="relative flex justify-around gap-4">
            {topics.map((topic, index) => (
              <Rating key={index} company_id={company_id} topic={topic} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
