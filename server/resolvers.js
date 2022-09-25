import { Job, Company } from "./db.js";
export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (_, { id }) => Job.findById(id),
    company: (_, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: (_, { title, companyId, description }) => {
      return Job.create({ title, companyId, description });
    },
  },

  Job: {
    company: ({ companyId }) => Company.findById(companyId),
  },

  Company: {
    jobs: ({ id }) => Job.findAll((job) => job.companyId === id),
  },
};
