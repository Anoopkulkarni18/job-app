import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "employeer")) {
      navigate("/");
    } else {
      const fetchJobs = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:1000/api/v1/job/getMyJobs",
            { headers: { token: localStorage.getItem("token") } }
          );
          setMyJobs(data.myJobs);
        } catch (error) {
          console.log(error);
          setMyJobs([]);
        }
      };
      fetchJobs();
    }
  }, []);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:1000/api/v1/job/updateJob/${jobId}`, updatedJob, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:1000/api/v1/job/deleteJob/${jobId}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => {
      return prevJobs.map((job) => {
        return job._id === jobId ? { ...job, [field]: value } : job;
      });
    });
  };

  return (
    <>
      <div className="jobs-page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => (
                  <div
                    className="card"
                    key={element._id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "20px",
                    }}
                  >
                    <div className="content" style={{ marginBottom: "20px" }}>
                      <div
                        className="short-fields"
                        style={{ marginBottom: "20px" }}
                      >
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            disabled={editingMode !== element._id}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Country:</span>
                          <input
                            type="text"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        <div>
                          <span>
                            Salary:{" "}
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                style={{
                                  width: "100%",
                                  marginBottom: "10px",
                                  padding: "8px",
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                }}
                                disabled={editingMode !== element._id}
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  style={{
                                    width: "calc(50% - 5px)",
                                    marginBottom: "10px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                  }}
                                  disabled={editingMode !== element._id}
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  style={{
                                    width: "calc(50% - 5px)",
                                    marginBottom: "10px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                  }}
                                  disabled={editingMode !== element._id}
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          <span>Expired:</span>
                          <select
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className="long-field"
                        style={{ marginBottom: "20px" }}
                      >
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            value={element.description}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            rows={5}
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            value={element.location}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="button-wrapper"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="edit-btn-wrapper"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              style={{
                                marginRight: "10px",
                                padding: "8px 16px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                              }}
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              style={{
                                padding: "8px",
                                backgroundColor: "red",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                              }}
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            style={{
                              marginRight: "10px",
                              padding: "8px 16px",
                              backgroundColor: "#007bff",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              transition: "background-color 0.3s",
                            }}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "red",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
