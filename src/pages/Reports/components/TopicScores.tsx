import React, { useEffect, useState, useContext, useRef } from "react";
import { getCompanyScores } from "../../../api/getCompanyScores";
import { getCompanySubTopics } from "../../../api/getCompanySubTopics";
import { getCompanyTopics } from "../../../api/getCompanyTopics";
import { Column } from "react-table";
import { TypeTopicScores } from "../../../types/TypeCompany";
import { ReportTable } from "../../../components/ReportTable";
import { calcScore, getScoreColor } from "../../../utils/Report";
import { TopicContext } from "../../../context/TopicContext";

type Data = {
  topic: string;
  sub_topic: string;
  score: string;
};

interface Props {
  company_id: string;
  company_name: string;
}

export const TopicScores: React.FC<Props> = ({ company_id, company_name }) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [sub_topics, setSubTopics] = useState<string[][]>([[]]);
  const [scores, setScores] = useState<number[][]>([[]]);
  const [cells, setCells] = useState<TypeTopicScores[]>([]);
  const { report_topic, setReportTopic } = useContext(TopicContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCompanyTopics(company_id).then((response) => {
      setTopics(response.data);
    });
  }, [company_id]);

  useEffect(() => {
    let requests: any[] = [];
    for (let i = 0; i < topics.length; i++) {
      requests[i] = getCompanySubTopics(company_id, topics[i]);
    }

    Promise.all(requests).then((responses) => {
      let data: string[][] = [[]];
      for (let i = 0; i < responses.length; i++) {
        data[i] = responses[i].data;
      }
      setSubTopics(data);
    });
  }, [topics]);

  useEffect(() => {
    let requests: any[] = [];

    let c = 0;
    for (let i = 0; i < topics.length; i++) {
      for (let j = 0; j < sub_topics[i].length; j++) {
        requests[c++] = getCompanyScores(
          company_id,
          topics[i],
          sub_topics[i][j]
        );
      }
    }

    Promise.all(requests).then((responses) => {
      let data: number[][] = [[]];
      let c = 0;
      for (let i = 0; i < topics.length; i++) {
        data[i] = [];
        for (let j = 0; j < sub_topics[i].length; j++) {
          data[i][j] = responses[c++].data.data[0].score;
        }
      }
      setScores(data);
    });
  }, [sub_topics]);

  useEffect(() => {
    let rows: TypeTopicScores[] = [];
    for (let i = 0; i < topics.length; i++) {
      let row: TypeTopicScores = { topic: topics[i], scores: [] };
      for (let j = 0; j < sub_topics[i].length; j++) {
        row.scores.push({ sub_topic: sub_topics[i][j], score: scores[i][j] });
      }
      rows.push(row);
    }
    setCells(rows);
  }, [scores]);

  const selectTopic = (e: React.MouseEvent<HTMLDivElement>) => {
    let topic = e.currentTarget.innerText.toLowerCase();
    typeof setReportTopic === "function" &&
      setReportTopic(report_topic === topic ? "" : topic);
  };

  const data: Array<any> = React.useMemo(() => {
    let newData: Array<Data> = [];
    cells.forEach((topic_item) => {
      topic_item.scores.forEach((score_item) => {
        newData.push({
          topic: topic_item.topic,
          sub_topic: score_item.sub_topic + "%S%" + topic_item.topic + "%E%",
          score:
            Math.round(calcScore(score_item.score)) +
            "%S%" +
            topic_item.topic +
            "%E%",
        });
      });
    });
    return newData;
  }, [cells]);

  const columns: Array<Column> = React.useMemo(
    () => [
      {
        Header: "Topic",
        accessor: "topic",
        enableRowSpan: true,
        Cell: ({ cell: { value } }) => (
          <div
            className={`transition duration-300 ease-in-out h-full cursor-pointer ${
              !!report_topic && report_topic !== value
                ? "text-gray-400 dark:text-gray-500 opacity-30"
                : ""
            }`}
            onClick={selectTopic}
          >
            {value}
          </div>
        ),
      },
      {
        Header: "Subtopic",
        accessor: "sub_topic",
        Cell: ({ cell: { value } }) => (
          <div
            className={`transition duration-300 ease-in-out h-full cursor-pointer ${
              !!report_topic &&
              report_topic !==
                value.substring(
                  value.indexOf("%S%") + 3,
                  value.lastIndexOf("%E%")
                )
                ? "text-gray-400 dark:text-gray-500 opacity-30"
                : ""
            }`}
          >
            {value.replace(/%S%(.*?)(%E%|$)/g, "")}
          </div>
        ),
      },
      {
        Header: "",
        accessor: "score",
        Cell: ({ cell: { value } }) => (
          <div
            className={`transition duration-300 ease-in-out text-center h-full cursor-pointer ${
              !!report_topic &&
              report_topic !==
                value.substring(
                  value.indexOf("%S%") + 3,
                  value.lastIndexOf("%E%")
                )
                ? "opacity-30"
                : ""
            }`}
          >
            <div
              className={`m-auto inline-block align-middle w-5 h-5 cursor-pointer transition
            bg-${getScoreColor(
              value.replace(/%S%(.*?)(%E%|$)/g, "")
            )} border border-${getScoreColor(
                value.replace(/%S%(.*?)(%E%|$)/g, "")
              )} 
            scale-90 hover:border-black hover:dark:border-white hover:scale-100`}
            ></div>
          </div>
        ),
      },
    ],
    [report_topic]
  );

  const handleClickOutside = (e: MouseEvent) => {
    ref &&
      ref.current &&
      !ref.current.contains(e.target as Node) &&
      typeof setReportTopic === "function" &&
      setReportTopic("");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="my-3">
      <h2 className="subtitle capitalize">{company_name}</h2>
      <div ref={ref} className="my-3">
        <ReportTable columns={columns} data={data} />
        <div className="text-gray-600 dark:text-gray-400">
          <div className="text-xxs mt-3 mb-1">Score Colors</div>
          <div className="flex items-center">
            <div className="flex-auto text-xxs p-1">0.0</div>
            <div className="flex-init flex w-full h-5 border border-gray-300 dark:border-gray-700">
              <div className="flex-auto bg-gradient-to-l from-orange-300 to-orange-800"></div>
              <div className="flex-init w-6 bg-gradient-to-r from-orange-300  to-sky-300"></div>
              <div className="flex-auto bg-gradient-to-r from-sky-300 to-sky-800"></div>
            </div>
            <div className="flex-auto text-xxs p-1">100.0</div>
          </div>
          <div className="hidden">
            <div className="flex-auto bg-orange-900 border-orange-900"></div>
            <div className="flex-auto bg-orange-800 border-orange-800"></div>
            <div className="flex-auto bg-orange-700 border-orange-700"></div>
            <div className="flex-auto bg-orange-600 border-orange-600"></div>
            <div className="flex-auto bg-orange-500 border-orange-500"></div>
            <div className="flex-auto bg-orange-400 border-orange-400"></div>
            <div className="flex-auto bg-orange-300 border-orange-300"></div>
            <div className="flex-auto bg-orange-200 border-orange-200"></div>
            <div className="flex-auto bg-orange-100 border-orange-100"></div>
            <div className="flex-auto bg-orange-50 border-orange-50"></div>
            <div className="flex-auto bg-sky-50 border-sky-50"></div>
            <div className="flex-auto bg-sky-100 border-sky-100"></div>
            <div className="flex-auto bg-sky-200 border-sky-200"></div>
            <div className="flex-auto bg-sky-300 border-sky-300"></div>
            <div className="flex-auto bg-sky-400 border-sky-400"></div>
            <div className="flex-auto bg-sky-500 border-sky-500"></div>
            <div className="flex-auto bg-sky-600 border-sky-600"></div>
            <div className="flex-auto bg-sky-700 border-sky-700"></div>
            <div className="flex-auto bg-sky-800 border-sky-800"></div>
            <div className="flex-auto bg-sky-900 border-sky-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
