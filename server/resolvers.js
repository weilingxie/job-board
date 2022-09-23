import { Job, Company } from "./db.js";
export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (_, { id }) => Job.findById(id),
    company: (_, { id }) => Company.findById(id),
  },

  Job: {
    company: ({ companyId }) => Company.findById(companyId),
  },
};
