import React from 'react';
import './index.css'; // Import the CSS file

function ApplicantCard({ applicantDetails, handleStatusChange }) {
  const { userId, username, email, phoneNumber, skills, educationDetails, status } = applicantDetails;

  return (
    <div className={`applicant-user-card applicant-${status.toLowerCase()}`}>
      <div className="applicant-user-info">
        <p className="applicant-info-item">Name: {username}</p>
        <p className="applicant-info-item">Email: {email}</p>
        <p className="applicant-info-item">Phone: {phoneNumber}</p>
        <p className="applicant-info-item">Skills: {skills}</p>
        <p className="applicant-info-item">Education: {educationDetails}</p>
      </div>
      <div className="applicant-application-status">
        <p className="applicant-status-text">Status: {status}</p>
        <div className="applicant-action-buttons">
          <button className="applicant-accept-button applicant-button" onClick={() => handleStatusChange('selected', userId)}>
            Accept
          </button>
          <button className="applicant-reject-button applicant-button" onClick={() => handleStatusChange('rejected', userId)}>
            Reject
          </button>
          <button className="applicant-review-button applicant-button" onClick={() => handleStatusChange('underreview', userId)}>
            Under Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicantCard;
