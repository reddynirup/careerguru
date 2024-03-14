const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database/dbconfig");
const bodyParser = require('body-parser');
const recruiterApis = require("./APIS/recruiterApis");
const userApis = require("./APIS/userApis");

const app = express();
const PORT = 5000;

connectToMongo();

app.use(cors());
app.use(bodyParser.json());
app.use("/user-api", userApis);
app.use("/recruiter-api", recruiterApis);
app.use(express.static(path.join(__dirname,"./build")));

app.listen(PORT, () => {
    console.log("server running on http://localhost:5000/");
});


//create a middleware to handle invalid path
const invalidPathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid path" });
};
  
app.use(invalidPathHandlingMiddleware);
  
  //create err handling middleware
const errHandler = (error, request, response, next) => {
  response.send({ "error-message": error.message });
};
app.use(errHandler);
