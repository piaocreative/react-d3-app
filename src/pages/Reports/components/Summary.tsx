import React from "react";

interface Props {
  company_id: string;
}

export const Summary: React.FC<Props> = ({ company_id }) => {
  return (
    <div className="my-3">
      <h2 className="subtitle">Company Summary</h2>
    </div>
  );
};
