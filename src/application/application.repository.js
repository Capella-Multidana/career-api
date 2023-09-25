const prisma = require("../db");

const applyForJob = async (jobId, userId, coverLetter, resumeUrl) => {
  try {
    const jobApplication = await prisma.jobApplication.create({
      data: {
        application_date: new Date(),
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        jobsId: jobId,
        job_seeker: {
            create: {
              ...userData,
            },
        },
      },
    });

    return jobApplication;
  } catch (error) {
    console.log(error)
    throw new Error('Error applying for the job: ' + error.message);
  }
};

module.exports = {
  applyForJob,
};
