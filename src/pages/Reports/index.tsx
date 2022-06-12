import React, { useContext, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PageLoading } from "../../components/PageLoading";
import { LoadingContext } from "../../context/LoadingContext";
import { Header } from "./Header";
import { SelectCompany } from "./SelectCompany";
import { Report } from "./Report";
import { CompanyContext } from "../../context/CompanyContext";
import { TopicContext } from "../../context/TopicContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface ReportsProps {}

export const Reports: React.FC<ReportsProps> = () => {
  const { loading } = useContext(LoadingContext);
  const [company_id, setCompanyId] = useState("");
  const [company_name, setCompanyName] = useState("");
  const company_context = useMemo(
    () => ({
      company_id,
      company_name,
      setCompanyId,
      setCompanyName,
    }),
    [company_id, company_name]
  );
  const [report_topic, setReportTopic] = useState("");
  const topic_context = useMemo(
    () => ({
      report_topic,
      setReportTopic,
    }),
    [report_topic]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <Header />
        <CompanyContext.Provider value={company_context}>
          <SelectCompany />
          {loading ? <PageLoading /> : <></>}
          <TopicContext.Provider value={topic_context}>
            {company_id ? (
              <Report company_id={company_id} company_name={company_name} />
            ) : (
              <></>
            )}
          </TopicContext.Provider>
        </CompanyContext.Provider>
      </div>
    </QueryClientProvider>
  );
};
