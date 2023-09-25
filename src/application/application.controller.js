// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");

const {
    applyForNewJob
} = require("./application.service");

const router = express.Router();

router.post("/new", async (req, res) => {
    try {
        const { jobId, coverLetter, resumeUrl, name, email, password} = req.body;
        const jobApplication = await applyForNewJob(
            jobId,
            coverLetter,
            resumeUrl,
            {name, email, password}
          );
      
          res.status(201).json({ message: 'Application submitted successfully', jobApplication });

      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});

module.exports = router;