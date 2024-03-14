import React from 'react';
import { Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar';
import './index.css';

function PostJob() {

  const { register, handleSubmit, setValue,clearErrors, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Your logic to collect and post data goes here

    // const url="http://localhost:5000/postjob";
    const recruiter=JSON.parse(localStorage.getItem("recruiterInfo"));
    // console.log(recruiter);
    const job={
        postedBy:recruiter.recruiterId,
        companyName:recruiter.companyName,
        companyImageUrl:recruiter.companyImageUrl,
        positionName:data.positionName,
        jobType:data.jobType,
        lastDate:data.lastDate,
        aboutJob:data.aboutJob,
        minQualifications:data.minQualifications,
        responsibilities:data.responsibilities,
        ctc:data.ctc,
        postedOn:Date.now()
    }
    const url="http://localhost:5000/recruiter-api/postjob"
    const options = {
      method: 'POST',
      body: JSON.stringify(job),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response=await fetch(url,options);
    const datares=await response.json();
    console.log(datares);
    // For simplicity, I'm just printing the data to the console here

    // You can navigate to another page after submitting the form
    // Reset the form
    setValue('positionName', '');
    setValue('jobType', '');
    setValue('lastDate', '');
    setValue('minQualifications', '');
    setValue('aboutJob', '');
    setValue('responsibilities', '');
    setValue('ctc', '');
    // Clear errors
    clearErrors();
    
  };

  return (
    <div className="post-job-container">
      <Navbar />
      <div className="post-job-form">
        <h2>Post a Job</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="position">Position Name</label>
            <input
              type="text"
              id="position"
              {...register('positionName', { required: '*Position Name is required' })}
              placeholder="Eg: Software Engineer II"
            />
            {errors.position && <span className="error">{errors.position.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Job Type</label>
            <select
              id="type"
              {...register('jobType', { required: '*Job Type is required' })}
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.type && <span className="error">{errors.type.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Last Date to Apply</label>
            <input
              type="date"
              id="date"
              {...register('lastDate', { required: '*Last Date to Apply is required' })}
            />
            {errors.date && <span className="error">{errors.date.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="minQualifications">Minimum Qualifications</label>
            <textarea
              id="minQualifications"
              {...register('minQualifications', { required: '*Minimum Qualifications are required' })}
              placeholder="Enter minimum qualifications..."
            ></textarea>
            {errors.minQualifications && <span className="error">{errors.minQualifications.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="aboutJob">About the Job</label>
            <textarea
              id="aboutJob"
              {...register('aboutJob', { required: '*About the Job is required' })}
              placeholder="Enter details about the job..."
            ></textarea>
            {errors.aboutJob && <span className="error">{errors.aboutJob.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="responsibilities">Responsibilities</label>
            <textarea
              id="responsibilities"
              {...register('responsibilities', { required: '*Responsibilities are required' })}
              placeholder="Enter job responsibilities..."
            ></textarea>
            {errors.responsibilities && <span className="error">{errors.responsibilities.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ctc">CTC</label>
            <input
              type="text"
              id="ctc"
              {...register('ctc', { required: '*CTC is required' })}
              placeholder="Eg: $80,000 - $100,000"
            />
            {errors.ctc && <span className="error">{errors.ctc.message}</span>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Post Job</button>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
