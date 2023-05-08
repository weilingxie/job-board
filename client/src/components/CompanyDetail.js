import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCompanyById } from "../graphql/queries";
import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  useEffect(() => {
    getCompanyById(companyId).then((company) => {
      console.log(company);
      setCompany(company);
    });
  }, [companyId]);

  return (
    company && (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5>Job Lists</h5>
        <JobList jobs={company.jobs} />
      </div>
    )
  );
}

export default CompanyDetail;
