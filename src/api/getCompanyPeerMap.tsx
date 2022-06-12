import { httpRequest } from "./httpRequest";

export const getCompanyPeerMap = async (company_id: string) => {
  return await httpRequest().get("/" + company_id + "/peer_map");
};
