const {
    applyForJob
  } = require("./application.repository");

  const applyForNewJob = async (jobId, coverLetter, resumeUrl, name, email, password) => {
    try {
      const jobApplication = await applyForJob(
        jobId,
        coverLetter,
        resumeUrl,
        {name, email, password}
      );
  
      return jobApplication;
    } catch (error) {
      throw new Error('Error applying for the job: ' + error.message);
    }
  };
  
  module.exports = {
    applyForNewJob
  };