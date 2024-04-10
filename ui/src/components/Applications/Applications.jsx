import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

export default function Applications() {
  const [change, setChange] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    coverLetter: "",
  });
  const { isAuthorized, user } = useContext(Context);
  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState(null); // To display the selected resume

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
    // Display the selected resume
    setResumeURL(URL.createObjectURL(resume));
  };
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", change.name);
    formData.append("email", change.email);
    formData.append("address", change.address);
    formData.append("phone", change.phone);
    formData.append("coverLetter", change.coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/application/postApplication",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setChange({
        name: "",
        phone: "",
        email: "",
        address: "",
        coverLetter: "",
      });
      setResume(null);
      setResumeURL(null); // Clear the displayed resume
      navigate("/applications/me");
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthorized || (user && user.role === "employeer")) {
    navigate("/");
  }

  return (
    <div>
      <section
        className="application"
        style={{ padding: "20px", backgroundColor: "#f7f7f7" }}
      >
        <div
          className="container"
          style={{
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>Application Form</h3>
          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={change.name}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "250px",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                margin: "10px 0",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={change.email}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "250px",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                margin: "10px 0",
              }}
            />
            <input
              type="number"
              placeholder="Your Phone Number"
              name="phone"
              value={change.phone}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "250px",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                margin: "10px 0",
              }}
            />
            <input
              type="text"
              placeholder="Your Address"
              name="address"
              value={change.address}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "250px",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                margin: "10px 0",
              }}
            />
            <textarea
              placeholder="CoverLetter..."
              name="coverLetter"
              value={change.coverLetter}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "calc(100% - 20px)",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none",
                margin: "10px 0",
              }}
            />

            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              >
                Select Resume
              </label>
              <input
                type="file"
                accept=".pdf, .jpeg, .png"
                onChange={handleFileChange}
                style={{
                  width: "calc(100% - 10px)",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "8px", // Adding padding for better appearance
                  backgroundColor: "#f9f9f9", // Light gray background color
                  color: "#333", // Dark text color
                }}
              />

              {/* Display selected resume */}
              {resumeURL && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f7f7f7",
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Selected Resume:
                  </p>
                  <iframe
                    src={resumeURL}
                    width="100%"
                    height="300px"
                    title="Resume"
                    style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                  ></iframe>
                </div>
              )}
            </div>
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
