import { Link } from "react-router-dom";
import UserNavbar from "../UserNavbar";
import "./index.css";

function JobSeekerHome() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userName = userInfo ? userInfo.username : null;

  return (
    <div className="jobseeker-home-page">
      <UserNavbar />
      
      {/* Hero Section with background image */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">
            {userName ? `Welcome, ${userName}!` : "Welcome to Career Guru Job Seeker Portal"}
          </h1>
          <p className="hero-subtext">
            Discover your next career opportunity with us!
          </p>
          <Link to="/user/alljobs">
            <a href="#get-started" className="cta-button">Get Started</a>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="jobseeker-home-page-container">
        
        {/* Why Choose Career Guru Section */}
        <section className="why-choose-section">
          <h2 className="section-heading">Why Choose Career Guru?</h2>
          <div className="why-choose-content">
            <p>
              We understand the challenges of job hunting, and our platform is designed to
              make the process efficient and enjoyable. Here's why you should choose Career Guru:
            </p>
            <ul className="features-list">
              <li>
                <img src="https://img.icons8.com/?size=100&id=7h7zsvNKSrlZ&format=png&color=000000" alt="Expansive Job Listings" />
                <strong>Expansive Job Listings: </strong> Access a wide range of job opportunities from top companies.
              </li>
              <li>
                <img src="https://img.icons8.com/?size=100&id=7h7zsvNKSrlZ&format=png&color=000000" alt="Smart Job Matching" />
                <strong>Smart Job Matching: </strong> Find positions that align with your skills and preferences effortlessly.
              </li>
              <li>
                <img src="https://img.icons8.com/?size=100&id=7h7zsvNKSrlZ&format=png&color=000000" alt="User Friendly Interface" />
                <strong>User-Friendly Interface: </strong> Navigate our platform with ease for a pleasant job search experience.
              </li>
              <li>
                <img src="https://img.icons8.com/?size=100&id=7h7zsvNKSrlZ&format=png&color=000000" alt="Time Efficient" />
                <strong>Time-Efficient: </strong> Save time with our streamlined application process.
              </li>
              <li>
                <img src="https://img.icons8.com/?size=100&id=7h7zsvNKSrlZ&format=png&color=000000" alt="Community Support" />
                <strong>Community Support: </strong> Connect with other job seekers and share insights for mutual growth.
              </li>
            </ul>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="get-started-section" id="get-started">
          <h2 className="section-heading">Get Started on Your Career Journey!</h2>
          <p>
            Join Career Guru today to embark on a journey towards your dream job. Whether you're
            an experienced professional or a fresh graduate, we have opportunities for everyone.
            Connect with us and experience a world where job seeking meets innovation.
          </p>
          <a href="/signup" className="cta-button">Join Now</a>
        </section>
      </div>
    </div>
  );
}

export default JobSeekerHome;