import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${process.env.REACT_APP_URI}/api/v1/job/getAllJobs`, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          setJobs(res.data.jobs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  if (!isAuthorized) {
    navigate("/login");
  }
  return (
    <section className="jobs page">
      <div className="container">
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          ALL AVAILABLE JOBS
        </h1>
        <div
          className="banner"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {jobs &&
            jobs.map((element) => {
              return (
                <div
                  className="card"
                  key={element._id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <p
                    style={{ margin: "0", fontSize: "18px", color: "#333333" }}
                  >
                    {element.title}
                  </p>
                  <p
                    style={{ margin: "0", fontSize: "18px", color: "#333333" }}
                  >
                    {element.category}
                  </p>
                  <p
                    style={{ margin: "0", fontSize: "18px", color: "#333333" }}
                  >
                    {element.country}
                  </p>
                  <Link
                    to={`/job/${element._id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      color: "#007bff",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Job Details
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
