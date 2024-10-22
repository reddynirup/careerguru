const express=require("express");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const mongoose=require("mongoose");
const expressAsyncHandler = require("express-async-handler");

const userApp=express.Router();

const User=require("../models/User");
const Job=require("../models/Job");
const AppliedJob=require("../models/AppliedJob");


// register api(public api) for users(job seekers)
userApp.post("/register",expressAsyncHandler(async (request, response) => {
    const { username, email, password } = request.body;
    try {
      // Check if the user with the same email already exists
      const existingUser=await User.findOne({ email });

      if(existingUser){
        //if user already exists there is a conflict in email so send 409 status indicates conflict of resources
        return response.status(409).send({message:"User with this same email already exists"});
      }

      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 6);

      // Create a new User instance
      const newUser = new User({ username, email, password: hashedPassword });

      // Save the user to the database
      await newUser.save();

      // Send response
      response.status(201).send({ message: "User created successfully" });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  })
);


//login api(public api) for users(job seekers)
userApp.post("/login",expressAsyncHandler(async (request, response) => {
    const { email, password } = request.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // If user doesn't exist, send a 404 Not Found status
      if (!user) {
          return response.status(404).send({ message: "Invalid email" });
      }

      // Compare the passwords
      const isPasswordValid = await bcryptjs.compare(password, user.password);

      // If passwords don't match, send a 401 Unauthorized status
      if (!isPasswordValid) {
          return response.status(401).send({ message: "Invalid password" });
      }

      // Create JWT token
      const signedJWTToken = jwt.sign({ email: user.email, userType: "JobSeeker" },
        process.env.USER_JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Send token in response
      response.status(200).send({
          message: "success",
          token: signedJWTToken,
          user: {
              userId: user._id,
              username: user.username,
              email: user.email,
              userType: "JobSeeker"
          }
      });
    } catch (error) {
      // For any other errors, send a 500 Internal Server Error status
      response.status(500).send({ message: "Internal Server Error" });
    }
  })
);


//user api to get the user details based on their id
userApp.get("/user-details/:userId", expressAsyncHandler(async (request, response) => {
  try {
    const { userId } = request.params;

    // Validate if userId exists
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return response.status(400).send({ message: "Invalid userId" });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user was found
    if (!user){
      return response.status(404).send({ message: "User not found" });
    }

    // Send the user details in the response
    response.status(200).send({ user });
  } catch (error) {
    //Error fetching user details
    response.status(500).send({ message: "Internal Server Error" });
  }
}));


//PROTECTED APIS

//api to get all jobs and information about applied jobs of user
userApp.get("/alljobs/:userId", expressAsyncHandler(async (request, response) => {
  try {
      const { userId } = request.params;
      // Extract filters from query parameters
      const { search='', jobType, ctc, sortByDate } = request.query;

      // Find jobs that have been applied by the user
      const appliedJobs = await AppliedJob.find({userId});

      // Extract jobIds from appliedJobs
      const appliedJobIds = appliedJobs.map(appliedJob => appliedJob.jobId);

      // Construct the filter object based on provided parameters
      const filters = {};
      if (search!='') {
          filters.positionName = { $regex: new RegExp(search, 'i') };
          // The 'i' flag makes the regex case-insensitive
      }
      if (jobType) filters.jobType = jobType;
      if (ctc) filters.ctc = ctc;

      // Fetch all jobs based on filters
      const allJobs = await Job.find(filters);

      // Apply sorting by date if specified
      if (sortByDate && sortByDate.toLowerCase() === 'latest') {
          allJobs.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
      }

      // Execute the query and send the response
      response.status(200).send({ jobs: allJobs, applied: appliedJobIds });
  } catch (error) {
      response.status(500).send({ message: "Internal Server Error" });
  }
}));

//api to apply for a job
userApp.post("/applyjob", expressAsyncHandler(async (request, response) => {
  try {
      const { jobId, recruiterId, userId, status } = request.body;

      // Check if the user has already applied for the job
      const existingApplication = await AppliedJob.findOne({ jobId, userId });

      if (existingApplication) {
          return response.status(209).send({ message: "You have already applied for this job" });
      }

      // Set appliedOn to the current date and time
      const appliedOn = new Date();

      // Create a new applied job instance
      const newAppliedJob = new AppliedJob({
          jobId,
          recruiterId,
          userId,
          status,
          appliedOn,
      });

      // Save the applied job to the database
      await newAppliedJob.save();

      // Send success response
      response.status(201).send({ message: "Job application submitted successfully" });
  } catch (error) {
      //Error while applying for job!!
      response.status(500).send({ message: "Internal Server Error" });
  }
}));


//api to get all applied jobs and their information
userApp.get("/appliedjobs/:userId", expressAsyncHandler(async (request, response) => {
  try {
    const { userId } = request.params;

    // Find jobs that have been applied by the user
    const appliedJobs = await AppliedJob.find({ userId });

    // Get job details and status for each applied job
    const appliedJobsDetails = [];
    for (const appliedJob of appliedJobs) {
      const jobDetails = await Job.findById(appliedJob.jobId);
      const jobWithStatus = { ...jobDetails._doc, status: appliedJob.status,appliedOn:appliedJob.appliedOn,applicationId:appliedJob._id};
      appliedJobsDetails.push(jobWithStatus);
    }

    // Send the response with details of applied jobs
    response.status(200).send({ appliedJobs: appliedJobsDetails });
  } catch (error) {
    //Error while fetching applied jobs
    response.status(500).send({ message: "Internal Server Error" });
  }
}));

//api to withdraw a job application made by the user
userApp.delete("/withdraw-application/:applicationId", expressAsyncHandler(async (request, response) => {
  try {
      // Get applicationId from URL parameters
      const { applicationId } = request.params;

      // Find and delete the applied job using the applicationId
      const deletedApplication = await AppliedJob.findByIdAndDelete(applicationId);

      // Check if the application was found and deleted
      if (deletedApplication) {
          response.status(200).send({ message: "Job application withdrawn successfully" });
      } else {
          response.status(404).send({ message: "Job application not found" });
      }
  } catch (error) {
      //Error withdrawing job application!!
      response.status(500).send({ message: "Internal Server Error" });
  }
}));

//api to update the user profile details 
userApp.put("/updateProfile/:userId", expressAsyncHandler(async (request, response) => {
  try {
    const { userId } = request.params;
    const { name, email, phoneNumber, address, skills, educationDetails,resumeUrl } = request.body;;

    // Validate if userId exists
    if (!userId){
      return response.status(400).send({ message: "Invalid userId" });
    }

    // Construct the update object based on non-empty fields
    const updateFields = {};
    if (name!=="") updateFields.username = name;
    if (email!=="") updateFields.email = email;
    if (phoneNumber!=="") updateFields.phoneNumber = phoneNumber;
    if (address!=="") updateFields.address = address;
    if (skills!=="") updateFields.skills = skills;
    if (educationDetails!=="") updateFields.educationDetails = educationDetails;
    if (resumeUrl) updateFields.resumeUrl = resumeUrl;


    // Find and update the user details
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    // Check if the user was found and updated
    if (updatedUser) {
      response.status(200).send({ message: "User details updated successfully", user: updatedUser });
    } else {
      response.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    response.status(500).send({ message: "Internal Server Error" });
  }
}));


module.exports=userApp;