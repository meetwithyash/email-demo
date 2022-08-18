require('dotenv').config()

const express = require("express");
const schedule = require('node-schedule');

const router = require("./server/routes/apiRouter");
const { sendMailJob } = require('./server/jobs/sendMailJob');

const app = express();

app.use(express.static('public'))
app.use(express.json());

app.use("/", router);

app.listen(3000, () => {
  console.log("Server running!");

  //scheduling job for sending mail every minute
  schedule.scheduleJob('*/1 * * * *', sendMailJob);
})