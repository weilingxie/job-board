import React, { useState, useEffect } from "react";
import JobList from "./JobList";
import { getJobs } from "../graphql/queries";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function getJobList() {
      const data = await getJobs();
      setJobs(data.jobs);
    }
    getJobList();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
