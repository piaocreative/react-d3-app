import { httpRequest } from "./httpRequest";

export const getCompanies = async () => {
  return await httpRequest().get("/");
};
