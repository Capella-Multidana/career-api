// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const {
  findJobs,
  findJobById,
  insertJob,
  deleteJob,
  editJob
} = require("./job.repository");

const getAllJobs = async () => {
  const jobs = await findJobs();

  return jobs;
};

const getJobById = async (id) => {
    const job = await findJobById(id);
  
    if (!job) {
      throw Error("Job not found");
    }
  
    return job;
  };

const createJob = async (newJobData) => {
    const job = await insertJob(newJobData);
    return job;
};

const deleteJobById = async (id) => {
    await getJobById(id);
  
    await deleteJob(id);
  };

const editJobById = async (id, jobData) => {
    await getJobById(id);

    const job = await editJob(id, jobData)

    return job;
};
  

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    deleteJobById,
    editJobById
};