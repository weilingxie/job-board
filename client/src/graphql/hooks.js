import {
  JOBS_QUERY,
  JOB_QUERY,
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
} from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import { getAccessToken } from "../auth";

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

export const useCreateJob = () => {
  const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION);
  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutate({
      variables: {
        input: {
          title,
          description,
        },
      },
      context: {
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`,
        },
      },
      update: (cache, { data: { job } }) => {
        cache.writeQuery({
          query: JOB_QUERY,
          variables: { id: job.id },
          data: { job },
        });
      },
    });
    return job;
  };

  return { createJob, loading };
};
