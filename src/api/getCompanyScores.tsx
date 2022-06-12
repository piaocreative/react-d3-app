import { httpRequest } from "./httpRequest";

export const getCompanyScores = async (
  company_id: string,
  topics: string,
  sub_topics: string
) => {
  return await httpRequest().get(
    "/" + company_id + "/scores/?topics=" + topics + "&subtopics=" + sub_topics
  );
};
