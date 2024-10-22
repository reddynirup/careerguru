import Navbar from "../Navbar";
import "./index.css";


function RecruiterHome() {
  const recruiterInfo = JSON.parse(localStorage.getItem("recruiterInfo"));
  const recruiterName = recruiterInfo ? recruiterInfo.username : null;

  return (
    <div className="recruiter-home-page">
      <Navbar />
      <div className="recruiter-home-page-container">
        <section className="hero-section">
          <div className="text-content">
            <h1 className="green-heading">
              {recruiterName ? `Welcome, ${recruiterName}!` : "Welcome to Career Guru Recruiter Portal"}
            </h1>
            <p>
              At Career Guru, we empower you to discover and hire top talent
              seamlessly. Leverage our platform to streamline your recruitment process.
            </p>
          </div>
          {/* <img src="https://img.icons8.com/?size=100&id=xU56jNYjpg5m&format=png&color=000000" alt="Hiring talent" className="hero-image" /> */}
        </section>

        <section className="why-choose-section">
          <h2 className="green-heading">Why Choose Career Guru?</h2>
          <div className="content-grid">
            <img src="https://img.icons8.com/?size=100&id=xU56jNYjpg5m&format=png&color=000000" alt="Recruitment features" className="features-image" />
            <p>
              Career Guru offers you access to an extensive pool of talented professionals
              while ensuring an effortless and efficient hiring process. Our platform's
              innovative tools allow you to discover the best fit for your company.
            </p>
          </div>
        </section>

        <section className="key-features-section">
          <h2 className="green-heading">Key Features:</h2>
          <ul>
            <li><strong>Diverse Talent Pool</strong>: Access highly skilled professionals across various industries.</li>
            <li><strong>Advanced Search Filters</strong>: Narrow down candidates using AI-driven tools.</li>
            <li><strong>User-Friendly Dashboard</strong>: Manage recruitment tasks from a simple and interactive dashboard.</li>
            <li><strong>Collaboration Tools</strong>: Work with your team to assess candidates seamlessly.</li>
          </ul>
        </section>

        <section className="testimonials-section">
          <h2 className="green-heading">What Recruiters Say About Us</h2>
          <div className="testimonials-grid">
            <blockquote>
              "Career Guru transformed our hiring process. We found the perfect match for our company!"
              <cite>- Jessica Smith, HR Manager</cite>
            </blockquote>
            <blockquote>
              "An intuitive platform that makes finding top candidates incredibly easy."
              <cite>- John Doe, Recruiter</cite>
            </blockquote>
          </div>
        </section>

        <section className="call-to-action-section">
          <h2 className="green-heading">Get Started Today!</h2>
          <p>
            Join the growing number of recruiters who trust Career Guru to simplify their hiring process.
            <strong> Start your journey towards smarter recruitment.</strong>
          </p>
          <button className="cta-button">Sign Up Now</button>
        </section>
      </div>
    </div>
  );
}

export default RecruiterHome;



// import Navbar from "../Navbar";
// import "./index.css";

// function RecruiterHome() {
//   const recruiterInfo = JSON.parse(localStorage.getItem("recruiterInfo"));
//   const recruiterName = recruiterInfo ? recruiterInfo.username : null;

//   return (
//     <div className="recruiter-home-page">
//       <Navbar />
//       <div className="recruiter-home-page-container">
//         <section>
//           <h1 className="green-heading">{recruiterName ? `Welcome, ${recruiterName}!` : "Welcome to Career Guru Recruiter Portal"}</h1>
//           <p>
//             At Career Guru, we understand the importance of finding the right
//             talent for your team. Our platform is designed to make the recruitment
//             process seamless, efficient, and enjoyable.
//           </p>
//         </section>

//         <section>
//           <h2 className="green-heading">Why Choose Career Guru?</h2>
//           <p>
//             We make hiring a breeze by providing you with a pool of exceptional
//             candidates. Our innovative features and user-friendly interface
//             empower you to connect with top-notch professionals effortlessly.
//           </p>
//         </section>

//         <section>
//           <h2 className="green-heading">Key Features:</h2>
//           <ul>
//             <li>Extensive Talent Pool: Access a diverse and skilled talent pool.</li>
//             <li>Efficient Search: Find candidates that match your requirements with ease.</li>
//             <li>Interactive Platform: Enjoy a dynamic and engaging recruitment experience.</li>
//             <li>Time-Saving: Streamline your hiring process for quicker results.</li>
//             <li>Collaborative Tools: Foster effective communication and collaboration with your team.</li>
//           </ul>
//         </section>

//         <section>
//           <h2 className="green-heading">Get Started Today!</h2>
//           <p>
//             Join Career Guru and revolutionize your hiring journey. Whether
//             you are looking for seasoned professionals or fresh talent, we've got
//             you covered. Connect with us and discover a world where recruitment
//             meets innovation.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default RecruiterHome;
