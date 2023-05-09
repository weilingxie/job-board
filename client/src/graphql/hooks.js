import { JOBS_QUERY, JOB_QUERY, COMPANY_QUERY } from "./queries";
import { useQuery } from "@apollo/client";

export const useJob = (id) => {
  const { data, loading, error } = useQuery(JOB_QUERY, {
    variables: { id },
  });

  return { job: data?.job, loading, error: Boolean(error) };
};

export const useJobs = () => {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });

  return { jobs: data?.jobs || [], loading, error: Boolean(error) };
};

export const useCompany = (id) => {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });

  return { company: data?.company, loading, error: Boolean(error) };
};
