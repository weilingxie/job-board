import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
// import { request } from "graphql-request";
import { getAccessToken } from "../auth";

const url = "http://localhost:9000/graphql";

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

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
  const {
    data: { jobs },
  } = await client.query({ query });
  // return await request(url, query);
  return jobs;
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
  const {
    data: { job },
  } = await client.query({ query, variables });
  console.log("job:", job);
  return job;
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
  const {
    data: { company },
  } = await client.query({ query, variables });
  return company;
}

export async function createJob(input) {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const variables = { input };
  const context = {
    headers: {
      "Authorization": `Bearer ${getAccessToken()}`,
    },
  };
  const {
    data: { job },
  } = await client.mutate({ mutation, variables, context });
  // const { job } = await request(url, query, variables, headers);
  return job;
}

export async function updateJob(input) {
  const mutation = gql`
    mutation UpdateJobMutation($input: UpdateJobInput!) {
      job: updateJob(input: $input) {
        id
      }
    }
  `;
  const variables = { input };
  const context = {
    headers: {
      "Authorization": `Bearer ${getAccessToken()}`,
    },
  };
  const {
    data: { job },
  } = await client.mutate({ mutation, variables, context });
  // const { job } = await request(url, query, variables, headers);
  return job;
  // const { job } = await request(url, query, variables, headers);
  return job;
}
