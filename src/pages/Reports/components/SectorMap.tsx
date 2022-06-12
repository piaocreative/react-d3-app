import React from "react";

interface Props {
  company_id: string;
}

export const SectorMap: React.FC<Props> = ({ company_id }) => {
  return (
    <div className="my-3">
      <h2 className="subtitle">Sector Map</h2>
    </div>
  );
};
