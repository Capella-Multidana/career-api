// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");

const {
  getAllUsers,
  getUserById,
  registerUser,
  authenticateUser
//   createJob,
//   deleteJobById,
//   editJobById
} = require("./user.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send(users);
});

router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(parseInt(userId));

    res.send({user});
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        if (user) {
            res.status(200).json({ message: 'User registered successfully', user });
          } else {
            res.status(401).json({ message: 'Error registering user' });
          }

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }

      } catch (error) {
        res.status(500).json({ error: 'Error authenticating user' }, error.message);
      }
});

// router.delete("/:id", async (req, res) => {
//     try {
//       const jobId = req.params.id; // string
  
//       await deleteJobById(parseInt(jobId));
  
//       res.send({
//         message: "Job Deleted",
//       });
//     } catch (error) {
//       res.status(400).send(error.message);
//     }
//   });

// router.patch("/:id", async (req, res) => {
// try {
//     const jobId = req.params.id;
//     const jobData = req.body;

//     const job = await editJobById(parseInt(jobId), jobData);

//     res.send({
//     data: job,
//     message: "edit Job success",
//     });
// } catch (err) {
//     res.status(400).send(err.message);
// }
// });

module.exports = router;