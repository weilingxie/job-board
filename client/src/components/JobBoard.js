import React, { useState, useEffect } from "react";
import JobList from "./JobList";
import { getJobs } from "../graphql/queries";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getJobList() {
      const jobs = await getJobs();
      setJobs(jobs);
    }

    try {
      getJobList();
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }, []);

  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
