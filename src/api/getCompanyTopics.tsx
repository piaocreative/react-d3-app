import { httpRequest } from "./httpRequest";

export const getCompanyTopics = async (company_id: string) => {
  return await httpRequest().get("/" + company_id + "/topics");
};
