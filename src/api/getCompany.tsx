import { httpRequest } from "./httpRequest";

export const getCompany = async (company_id: string) => {
  return await httpRequest().get("/" + company_id);
};
