import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { getCompanies } from "../../api/getCompanies";
import { CompanyContext } from "../../context/CompanyContext";
import { LoadingContext } from "../../context/LoadingContext";
import { TypeCompany } from "../../types/TypeCompany";

interface Props {}

export const SelectCompany: React.FC<Props> = () => {
  const { isLoading, error, data } = useQuery<any, Error>(["companies"], () =>
    getCompanies()
  );
  const { setLoading } = useContext(LoadingContext);
  const { setCompanyId, setCompanyName } = useContext(CompanyContext);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isLoading || error) {
    return <></>;
  }

  const companies = data?.data ? (data.data as TypeCompany[]) : [];

  const changeCompany = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let index = e.target.selectedIndex;
    let name = e.target[index].innerText;
    setCompanyId && setCompanyId(e.target.value);
    setCompanyName && setCompanyName(name);
  };

  return (
    <div className="flex text-sm mx-auto md:w-1/2">
      <label
        htmlFor="company"
        className="flex-none self-center dark:text-white mr-2"
      >
        Search
      </label>
      <select
        id="company"
        className="flex-auto form-select form-select-sm appearance-none px-2 py-1
        text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
          rounded transition ease-in-out m-0
          dark:text-white dark:bg-gray-600 dark:border-gray-500"
        onChange={changeCompany}
      >
        <option value=""></option>
        {companies.map((company) => (
          <option key={company.ticker_id} value={company.ticker_id}>
            {company.ticker_name}
          </option>
        ))}
      </select>
    </div>
  );
};
