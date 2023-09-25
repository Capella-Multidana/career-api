// Berkomunikasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya apa? Supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../db");

const findUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    return user;
  };

  const createUser = async (name, email, password) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error('Email is already in use. Please use a different email.');
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    });
  
    return user;
  };
  

// const insertJob = async (jobData) => {
//     const job = await prisma.Jobs.create({
//       data: {
//         job_title: jobData.job_title,
//         location: jobData.location,
//         desc: jobData.desc,
//         requirements: jobData.requirements,
//         posted_date: jobData.posted_date,
//         expired_date: jobData.expired_date
//       },
//     });
  
//     return job;
//   };
  

// const deleteJob = async (id) => {
//   await prisma.Jobs.delete({
//     where: {
//       id,
//     },
//   });
//   // DELETE FROM products WHERE id = {productId}
// };

// const editJob = async (id, jobData) => {
//   const job = await prisma.Jobs.update({
//     where: {
//       id: parseInt(id),
//     },
//     data: {
//         job_title: jobData.job_title,
//         location: jobData.location,
//         desc: jobData.desc,
//         requirements: jobData.requirements,
//         posted_date: jobData.posted_date,
//         expired_date: jobData.expired_date,
//     },
//   });

//   return job;
// };

module.exports = {
    findUsers,
    findUserById,
    findUserByEmail,
    createUser
    // insertJob,
    // deleteJob,
    // editJob
};