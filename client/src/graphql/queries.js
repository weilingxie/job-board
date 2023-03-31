import { request, gql } from "graphql-request";
import { getAccessToken } from "../auth";

const url = "http://localhost:9000/graphql";
export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        description
        company {
          name
        }
      }
    }
  `;
  return await request(url, query);
}

export async function getJobById(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const variables = { id };
  return await request(url, query, variables);
}
export async function getCompanyById(id) {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;
  const variables = { id };
  return await request(url, query, variables);
}

export async function createJob(input) {
  const query = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const variables = { input };
  const headers = {
    "Authorization": `Bearer ${getAccessToken()}`,
  };
  const { job } = await request(url, query, variables, headers);
  return job;
}
