import React from "react";

interface Props {
  company_id: string;
}

export const NewsSentiment: React.FC<Props> = ({ company_id }) => {
  return (
    <div className="my-3 text-center">
      <h2 className="subtitle">Last 12 Months</h2>
    </div>
  );
};
