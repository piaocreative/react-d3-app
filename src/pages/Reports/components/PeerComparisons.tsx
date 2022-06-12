import React, { useEffect, useState, useContext } from "react";
import { getCompanyPeerMap } from "../../../api/getCompanyPeerMap";
import { VerticalBarChart } from "../../../components/d3/VerticalBarChart";
import { TypePeerMaps } from "../../../types/TypeCompany";
import { getMaxNumberUnit } from "../../../utils/Number";
import { calcScore } from "../../../utils/Report";
import { TopicContext } from "../../../context/TopicContext";

interface Props {
  company_id: string;
}

export const PeerComparisons: React.FC<Props> = ({ company_id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCompanyPeerMap(company_id).then((response) => {
      setData(response.data);
    });
  }, [company_id]);

  const { report_topic } = useContext(TopicContext);
  const peer_map = data ? (data as TypePeerMaps).data : [];
  const chart_data = peer_map.length
    ? peer_map.map((d) => ({
        value: calcScore(d.signals_average),
        barColor: d.signals_average > 0 ? "#4e79a7" : "#f28e2b",
        bgColor: "transparent",
        label: d.ticker_name,
      }))
    : [];
  const max = getMaxNumberUnit(
    calcScore(
      peer_map.length
        ? peer_map.reduce((prev, current) => {
            if (prev.signals_average < current.signals_average) return current;
            return prev;
          }).signals_average
        : 0
    )
  );

  return (
    <div className="my-3">
      <h2 className="subtitle">Peer Comparisons</h2>
      <div className="my-2">
        <VerticalBarChart
          width={100}
          height={160}
          max={max}
          data={chart_data}
          caption="ESG Score"
          sortable={true}
          refresh={report_topic !== ""}
        />
      </div>
    </div>
  );
};
