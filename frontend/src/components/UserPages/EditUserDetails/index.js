import React, { useState, useEffect } from "react";
import UserNavbar from "../UserNavbar";
import { useForm } from "react-hook-form";
import "./index.css";

function EditUserDetails() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const userId = userInfo ? userInfo.userId : null;
        const url = `/user-api/user-details/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Set form values with user details
        if (data && data.user) {
          const { username, email, phoneNumber, address, skills, educationDetails } = data.user;
          setValue("fullName", username);
          setValue("email", email);
          setValue("phoneNumber", phoneNumber);
          setValue("address", address);
          setValue("skills", skills);
          setValue("educationDetails", educationDetails);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [setValue]);

  const handleFormSubmit = async (data) => {
    const updateDetails = {
      name: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      skills: data.skills,
      educationDetails: data.educationDetails,
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo ? userInfo.userId : null;
    const url = `/user-api/updateProfile/${userId}`;
    const options = {
      method: "PUT",
      body: JSON.stringify(updateDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      setNotification("User details updated successfully");

      // Show notification for 1 second and then reset
      setTimeout(() => {
        setNotification(null);
      }, 1000);

      reset();
    } catch (error) {
      console.error("Error updating user details:", error);
      setNotification("Failed to update user details");
    }
  };

  return (
    <div className="edit-user-details-page">
      <UserNavbar />
      <div className="edit-user-details-container">
        <form
          className="edit-user-details-form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <label className="edit-user-details-label">
            Full Name:
            <input
              className="edit-user-details-input"
              type="text"
              {...register("fullName")}
            />
          </label>

          <label className="edit-user-details-label">
            Email:
            <input
              className="edit-user-details-input"
              type="email"
              {...register("email")}
            />
          </label>

          <label className="edit-user-details-label">
            Phone Number:
            <input
              className="edit-user-details-input"
              type="tel"
              {...register("phoneNumber")}
            />
          </label>

          <label className="edit-user-details-label">
            Address:
            <input
              className="edit-user-details-input"
              {...register("address")}
            />
          </label>

          <label className="edit-user-details-label">
            Skills:
            <input
              className="edit-user-details-input"
              type="text"
              {...register("skills")}
            />
          </label>

          <label className="edit-user-details-label">
            Education Details:
            <input
              className="edit-user-details-input"
              type="text"
              {...register("educationDetails")}
            />
          </label>

          <label className="edit-user-details-label">
            Resume (PDF):
            <input
              className="edit-user-details-input"
              type="file"
              disabled
            />
          </label>

          <button className="edit-user-details-button" type="submit">
            Save Changes
          </button>
        </form>

        {notification && (
          <div className="notification">
            <p>{notification}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditUserDetails;
