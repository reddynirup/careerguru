const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const bodyParser = require('body-parser');
const path=require("path");

const connectToMongo = require("./database/dbconfig");
const recruiterApis = require("./APIS/recruiterApis");
const userApis = require("./APIS/userApis");

// Creating an Express HTTP server instance
const app = express();

// Configuring the environment variables from the .env file
dotenv.config();

// Connecting to MongoDB database
connectToMongo();

// Using CORS (Cross-Origin Resource Sharing) to allow requests from any origin
app.use(cors());

//parsing the incoming request body from json to a javascript object and making them available under req.body
app.use(bodyParser.json());

// Forwarding user-related requests to user APIs
app.use("/user-api", userApis);

// Forwarding recruiter-related requests to recruiter APIs
app.use("/recruiter-api", recruiterApis);


// //-----------------deployment---------------------
// const __dirname1=path.resolve();
// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname1,'/frontend/build')))
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
//     })
// }
// else{
//     app.get("/",(req,res)=>{
//         res.send("API is running successfully..");
//     })
// }

// //-----------------deployment---------------------





//create a middleware to handle invalid path
const invalidPathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid path" });
};
  
app.use(invalidPathHandlingMiddleware);
  
//create error handling middleware
const errHandler = (error, request, response, next) => {
  response.send({ "error-message": error.message });
};
app.use(errHandler);


const PORT = process.env.PORT || 5000;
//starting the server to listen on a port
app.listen(PORT, () => {
    console.log(`Server running successfully at http://localhost:${PORT}/`);
});