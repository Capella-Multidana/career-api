const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();


const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req,res) => {
    res.send("Capella Staging API")
})

const jobController = require("./job/job.controller");
const userController = require("./user/user.controller");
const applicationController = require("./application/application.controller");

app.use("/jobs", jobController);
app.use("/users", userController);
app.use("/application", applicationController);

app.listen(PORT, () => {
    console.log("Express API running in PORT: " + PORT);
})