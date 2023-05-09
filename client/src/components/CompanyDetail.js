import { useParams } from "react-router";
import JobList from "./JobList";
import { useCompany } from "../graphql/hooks";

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);
  // const [company, setCompany] = useState();
  // useEffect(() => {
  //   getCompanyById(companyId).then((company) => {
  //     console.log(company);
  //     setCompany(company);
  //   });
  // }, [companyId]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong</p>;

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
