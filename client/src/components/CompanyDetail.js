import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCompanyById } from "../graphql/queries";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  useEffect(() => {
    getCompanyById(companyId).then((result) => {
      console.log(result);
      setCompany(result.company);
    });
  }, [companyId]);

  return (
    company && (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
      </div>
    )
  );
}

export default CompanyDetail;
