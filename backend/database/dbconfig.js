const mongoose = require("mongoose");

// Function to establish connection to MongoDB database
function connectToMongo() {
    
    mongoose.set("strictQuery", true);

    // Connect to MongoDB using provided URI and configuration options
    mongoose.connect(process.env.MONGO_URI, {     
        dbName: "careerguru"            
    });

    // Get the default Mongoose connection
    const db = mongoose.connection;

    // Event listener for connection errors
    db.on("error", console.error.bind(console, "connection error: "));

    // Event listener for successful database connection which will execute for once on successful connection
    db.once("open", function () {
        console.log("Database connected successfully!!\nHappy coding");
    });
}

module.exports = connectToMongo;




















// //this is for connecting to mongodb database

// const mongoose = require("mongoose");
// // const dotenv=require("dotenv");
// // dotenv.config({path:'mongo.env'});
// const url="mongodb://localhost:27017/Jobportal";

// function connectToMongo() {
//     mongoose.set("strictQuery", true);
//     mongoose.connect(url,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//     ); 

//     const db = mongoose.connection;

//     db.on("error", console.error.bind(console, "connection error: "));
//     db.once("open", function () {
//         console.log("Database connected successfully!!\nHappy coding");
//     });
// }

// module.exports = connectToMongo;