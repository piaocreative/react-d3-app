import { httpRequest } from "./httpRequest";

export const getCompanySubTopics = async (
  company_id: string,
  topic_name: string
) => {
  return await httpRequest().get(
    "/" + company_id + "/topics/" + topic_name + "/subtopics"
  );
};
