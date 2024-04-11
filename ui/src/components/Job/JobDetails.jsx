import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URI}/api/v1/job/getSingleJob/${id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        setJob(response.data.job);
      } catch (error) {
        console.log(error);
        navigate("/*");
      }
    };
    fetchJob();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <section className="jobDetail page" style={{ marginTop: "20px" }}>
        <div className="container">
          <h3 style={{ color: "#333", marginBottom: "20px" }}>Job Details</h3>
          <div
            className="banner"
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Title:</strong> {job.title}
            </p>
            <p>
              <strong>Category:</strong> {job.category}
            </p>
            <p>
              <strong>Country:</strong> {job.country}
            </p>
            <p>
              <strong>City:</strong> {job.city}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <strong>Job Posted On:</strong> {job.jobPostedOn}
            </p>
            <p>
              <strong>Salary:</strong>
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
            {user && user.role === "employer" ? (
              <></>
            ) : (
              <Link
                to={`/application/${job._id}`}
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
