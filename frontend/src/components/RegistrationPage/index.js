import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import registrationImage from "../../assets/registrationImage.avif";
import logo from "../../assets/logo.png";
import "./index.css";

function UserRegister() {
  const navigate=useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [errorMsg, setErrorMsg] = useState(""); 

  const onSubmit = async  (dat) => {
    const user=dat;
    if(user.userType==="JobSeeker"){
      const userData={
        username:user.username,
        email:user.email,
        password:user.password
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const userRegisterUrl="/user-api/register";
      try {
        const response = await fetch(userRegisterUrl, options);
        console.log(response);
        if (response.status===200) {
          throw new Error("User with the same email already exists.");
        }
      
        const data = await response.json();
        console.log(data);
        navigate("/",{replace:true});
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.message);
      }
  
    }
    else if(user.userType==="Recruiter"){
      const userData={
        username:user.username,
        email:user.email,
        password:user.password,
        companyName:user.companyName,
        companyImageUrl:user.companyImageUrl
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const recruiterRegisterUrl="/recruiter-api/register";
      try {
        const response = await fetch(recruiterRegisterUrl, options);
        console.log(response);
        if (response.status===200) {
          throw new Error("Recruiter with the same email already exists");
        }
      
        const data = await response.json();
        console.log(data);
        navigate("/",{replace:true});
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.message);
      }
    }
  };

  const userType = watch("userType");

  return (
    <div className="register-container">
      <div className="user-register-page">
        <div className="user-register-page-image-container">
          <img alt="job" className="register-page-image" src={registrationImage} />
        </div>
        <div className="user-register-page-form-container">
          <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="logo-container">
              <img className="website-logo" src={logo} alt="app-logo"/>
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="user-register-element"
                {...register("username", { required: true })}
              />
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="email">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="user-register-element"
                {...register("email", { required: true })}
              />
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="user-register-element"
                {...register("password", { required: true })}
              />
            </div>
            <div className="user-input-container">
              <label className="user-register-label" htmlFor="user-type">
                USER-TYPE
              </label>
              <select {...register("userType")} className="types-list-container" defaultValue="DEFAULT">
                <option value="DEFAULT" disabled>
                  Choose an option
                </option>
                <option value="Recruiter">Recruiter</option>
                <option value="JobSeeker">Job Seeker</option>
              </select>
            </div>

            {/* Additional fields based on the selected user type */}
            {/* {userType === "JobSeeker" && (
              <div className="user-input-container">
                <label className="user-register-label" htmlFor="skills">
                  Skills
                </label>
                <Select
                  isMulti
                  options={[
                    { value: "Python", label: "Python" },
                    { value: "JavaScript", label: "JavaScript" },
                    { value: "Java", label: "Java" },
                    { value: "Script", label: "Script" },
                    
                  ]}
                  {...register("skills", { required: true })}
                />
              </div>
            )} */}

            {userType === "Recruiter" && (
              <>
                <div className="user-input-container">
                  <label className="user-register-label" htmlFor="companyName">
                    COMPANY-NAME
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="user-register-element"
                    {...register("companyName", { required: true })}
                  />
                </div>
                <div className="user-input-container">
                  <label className="user-register-label" htmlFor="companyImageUrl">
                    COMPANY IMAGE URL
                  </label>
                  <input
                    type="text"
                    id="companyImageUrl"
                    name="companyImageUrl"
                    className="user-register-element"
                    {...register("companyImageUrl", { required: true })}
                  />
                </div>
              </>
            )}

            <div className="register-page-button-container">
              <button type="submit" className="register-button">
                Register
              </button>
              <p className="already-have-account">
                Already have an account? <Link to={"/"}><span className="got-to-login-link">Login here</span>
                </Link>
              </p>
            </div>
            {errorMsg!=="" && <p className="errormessage">{errorMsg}</p>}
          </form>
        </div>

      </div>
    </div>
  );
}

export default UserRegister;
