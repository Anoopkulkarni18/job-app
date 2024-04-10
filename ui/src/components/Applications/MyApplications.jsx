import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ResumeModal from "./ResumeModal";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "employeer") {
        axios
          .get(
            "http://localhost:1000/api/v1/application/employeerGetAllApplications",
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(
            "http://localhost:1000/api/v1/application/jobSeekerGetAllApplications",
            { headers: { token: localStorage.getItem("token") } }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigate("/login");
  }

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `http://localhost:1000/api/v1/application/deleteApplication/${id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setApplications((prev) => {
        return prev.filter((applications) => applications._id !== id);
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <section>
        {applications && applications.length > 0 ? ( // Check if applications is defined and has length
          user && user.role === "jobSeeker" ? (
            <div className="container">
              <h1>My Applications</h1>
              {applications.map((element) => (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  handleDelete={() => handleDelete(element._id)}
                  openModal={openModal}
                />
              ))}
            </div>
          ) : (
            <div className="container">
              <h1>Applications From Job Seekers</h1>
              {applications.map((element) => (
                <EmployerCard
                  element={element}
                  key={element._id}
                  handleDelete={() => handleDelete(element._id)}
                  openModal={openModal}
                />
              ))}
            </div>
          )
        ) : (
          <div className="container">
            <h4>No Applications Found</h4>
          </div>
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </section>
    </div>
  );
}

const JobSeekerCard = ({ element, handleDelete, openModal }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          style={{ maxWidth: "100px", maxHeight: "100px" }} // Set maximum width and height for the image
        />
      </div>
      <div className="btn_area">
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleDelete(element._id)}
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      </div>
    </div>
  );
};
