// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");

const {
  getAllJobs,
  getJobById,
  createJob,
  deleteJobById,
  editJobById
} = require("./job.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const jobs = await getAllJobs();

  res.send(jobs);
});

router.get("/:id", async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await getJobById(parseInt(jobId));

    res.send(job);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
    try {
        const newJobData = req.body;
        const job = await createJob(newJobData);
    
        res.send({
          data: job,
          message: "Create Job success",
        });
      } catch (error) {
        res.status(400).send(error.message);
      }
});

router.delete("/:id", async (req, res) => {
    try {
      const jobId = req.params.id; // string
  
      await deleteJobById(parseInt(jobId));
  
      res.send({
        message: "Job Deleted",
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.patch("/:id", async (req, res) => {
try {
    const jobId = req.params.id;
    const jobData = req.body;

    const job = await editJobById(parseInt(jobId), jobData);

    res.send({
    data: job,
    message: "edit Job success",
    });
} catch (err) {
    res.status(400).send(err.message);
}
});

module.exports = router;