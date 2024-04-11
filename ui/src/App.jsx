import React, { useContext, useEffect } from "react";
import { Context } from "./main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Applications from "./components/Applications/Applications";
import MyApplications from "./components/Applications/MyApplications";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import JobDetails from "./components/Job/JobDetails";
import Jobs from "./components/Job/Jobs";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJobs";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import Home from "./components/Home/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `https://job-app-zdm4.onrender.com/api/v1/user/getUser`,
            {
              headers: { token: localStorage.getItem("token") },
            }
          );
          setUser(response.data.user);
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Applications />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </div>
  );
};

export default App;
