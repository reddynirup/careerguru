import { BrowserRouter,Route,Routes } from "react-router-dom";
import UserLogin from "./components/LoginPage"
import UserRegister from "./components/RegistrationPage"
import UserHome from "./components/UserPages/UserHome"
import PageNotFound from "./components/PageNotFound";
import UserProtectedRoutes from "./components/UserProtectedRoutes"
import RecruiterProtectedRoutes from "./components/RecruiterProtectedRoutes"
import RecruiterHome from "./components/RecruiterPages/Home";
import MyJobs from "./components/RecruiterPages/MyJobs";
import PostJob from "./components/RecruiterPages/PostJob";
import Applications from "./components/RecruiterPages/Applications";
import AllJobs from "./components/UserPages/AllJobs";
import AppliedJobs from "./components/UserPages/AppliedJobs";
import EditUserDetails from "./components/UserPages/EditUserDetails";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route exact path="/login" element={<UserLogin/>} />
          <Route exact path="/register" element={<UserRegister/>} />
          <Route path="*" element={<PageNotFound/>} />
          {/* USER PROTECTED ROUTES */}
          <Route element={<UserProtectedRoutes/>}>
            <Route exact path="/home" element={<UserHome/>} />
            <Route exact path="/alljobs" element={<AllJobs/>} />
            <Route exact path="/appliedjobs" element={<AppliedJobs/>} />
            <Route exact path="/updateUserProfile" element={<EditUserDetails/>} />
          </Route>
          {/* RECRUITER PROTECTED ROUTES */}
          <Route element={<RecruiterProtectedRoutes/>}>
            <Route exact path="/home" element={<RecruiterHome/>} />
            <Route exact path="/myjobs" element={<MyJobs/>} />
            <Route exact path="/postjob" element={<PostJob/>} />
            <Route exact path="/applications/:jobId" element={<Applications/>} />
          </Route>

          
        </Routes>
      </BrowserRouter>  
    </>
    
  );
}

export default App;
