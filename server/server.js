const express = require("express");
const connectDB = require("./config/connectDB");
const user = require('./routes/user')

const app = express();

app.use(express.json());

connectDB();

const port = process.env.PORT ;

app.use('/user' , user)

app.listen(port, (err) =>
  err
    ? console.log("Server Error", err)
    : console.log(`Server is running on port ${port}`)
);
