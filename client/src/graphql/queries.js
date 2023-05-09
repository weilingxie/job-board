import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
// import { request } from "graphql-request";
import { getAccessToken } from "../auth";

const url = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: "network-only", // fetch every time, but also store cache
  //   },
  //   mutate: {
  //     fetchPolicy: "network-only", // fetch every time, but also store cache
  //   },
  //   watchQuery: {
  //     // Observe any change to the result
  //     fetchPolicy: "cache-and-network", // fetch from cache, at the same time, fetch from server, and if result changes, update it
  //   },
  // },
});

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;

export const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const JOBS_QUERY = gql`
  query {
    jobs {
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

export const COMPANY_QUERY = gql`
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

// Replace by useQuery hook
// export async function getJobs() {
//   const {
//     data: { jobs },
//   } = await client.query({ JOBS_QUERY, fetchPolicy: "no-cache" });
//   // return await request(url, query);
//   return jobs;
// }

// export async function getJobById(id) {
//   const variables = { id };
//   const {
//     data: { job },
//   } = await client.query({ JOB_QUERY, variables });
//   console.log("job:", job);
//   return job;
// }
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
        ...JobDetail
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;
  const variables = { input };
  const context = {
    headers: {
      "Authorization": `Bearer ${getAccessToken()}`,
    },
  };
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      });
    },
  });
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
}
