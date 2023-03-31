import { Job, Company } from "./db.js";
export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (_, { id }) => Job.findById(id),
    company: (_, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: (_, { input }, { auth }) => {
      console.log("[createJob] context:", auth);
      if (!auth) {
        throw new Error("Unauthorized");
      }
      return Job.create({ ...input });
    },
  },

  Job: {
    company: ({ companyId }) => Company.findById(companyId),
  },

  Company: {
    jobs: ({ id }) => Job.findAll((job) => job.companyId === id),
  },
};
