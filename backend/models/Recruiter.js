const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecruiterSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    companyImageUrl:{
        type: String,
        default:"https://img.icons8.com/?size=100&id=20318&format=png&color=000000"
    }
  });
  const Recruiter = mongoose.model('Recruiters', RecruiterSchema);
  module.exports = Recruiter;