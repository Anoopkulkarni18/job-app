import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PostJobs() {
  const [change, setChange] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    salaryType: "default",
  });
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  const handlePostJob = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      salaryFrom,
      salaryTo,
      fixedSalary,
      salaryType,
    } = change;

    let data;
    if (salaryType === "Fixed Salary") {
      data = {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
      };
    } else if (salaryType === "Ranged Salary") {
      data = {
        title,
        description,
        category,
        country,
        city,
        location,
        salaryFrom,
        salaryTo,
      };
    } else {
      data = { title, description, category, country, city, location };
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/job/postJobs",
        data,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log("post job test");
      toast(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isAuthorized || (user && user.role !== "employeer")) {
    navigate("/");
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
      }}
    >
      <h3
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        POST NEW JOB
      </h3>
      <form
        onSubmit={handlePostJob}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={change.title}
            onChange={handleChange}
            placeholder="Enter job title"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Category:
          </label>
          <select
            name="category"
            value={change.category}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="">Select Category</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Frontend Web Development">
              Frontend Web Development
            </option>
            <option value="MERN Stack Development">
              MERN STACK Development
            </option>
            <option value="Account & Finance">Account & Finance</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Video Animation">Video Animation</option>
            <option value="MEAN Stack Development">
              MEAN STACK Development
            </option>
            <option value="MEVN Stack Development">
              MEVN STACK Development
            </option>
            <option value="Data Entry Operator">Data Entry Operator</option>
          </select>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Country:
          </label>
          <input
            type="text"
            name="country"
            value={change.country}
            onChange={handleChange}
            placeholder="Enter country"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            City:
          </label>
          <input
            type="text"
            name="city"
            value={change.city}
            onChange={handleChange}
            placeholder="Enter city"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={change.location}
            onChange={handleChange}
            placeholder="Enter location"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Salary Type:
          </label>
          <select
            name="salaryType"
            value={change.salaryType}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>
        </div>
        {change.salaryType === "Fixed Salary" ? (
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Fixed Salary:
            </label>
            <input
              type="number"
              placeholder="Enter fixed salary"
              name="fixedSalary"
              value={change.fixedSalary}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
        ) : (
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Salary Range:
            </label>
            <input
              type="number"
              placeholder="From"
              name="salaryFrom"
              value={change.salaryFrom}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
            <input
              type="number"
              placeholder="To"
              name="salaryTo"
              value={change.salaryTo}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
        )}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Description:
          </label>
          <textarea
            rows="5"
            name="description"
            value={change.description}
            onChange={handleChange}
            placeholder="Enter job description"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
