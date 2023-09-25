// Berkomunikasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya apa? Supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../db");

const findJobs = async () => {
  const jobs = await prisma.Jobs.findMany();

  return jobs;
};

const findJobById = async (id) => {
  const job = await prisma.Jobs.findUnique({
    where: {
      id,
    },
  });

  return job;
};

const insertJob = async (jobData) => {
    const job = await prisma.Jobs.create({
      data: {
        job_title: jobData.job_title,
        location: jobData.location,
        desc: jobData.desc,
        requirements: jobData.requirements,
        posted_date: jobData.posted_date,
        expired_date: jobData.expired_date
      },
    });
  
    return job;
  };
  

const deleteJob = async (id) => {
  await prisma.Jobs.delete({
    where: {
      id,
    },
  });
  // DELETE FROM products WHERE id = {productId}
};

const editJob = async (id, jobData) => {
  const job = await prisma.Jobs.update({
    where: {
      id: parseInt(id),
    },
    data: {
        job_title: jobData.job_title,
        location: jobData.location,
        desc: jobData.desc,
        requirements: jobData.requirements,
        posted_date: jobData.posted_date,
        expired_date: jobData.expired_date,
    },
  });

  return job;
};

module.exports = {
    findJobs,
    findJobById,
    insertJob,
    deleteJob,
    editJob
};