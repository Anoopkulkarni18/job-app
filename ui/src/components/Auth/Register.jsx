import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

export default function Register() {
  const [change, setChange] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { setIsAuthorized } = useContext(Context);
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_URI}/api/v1/user/register`,
        change
      );
      console.log(change);
      localStorage.setItem("token", response.data.token);
      setIsAuthorized(true);
      navigate("/");
      setChange({ name: "", email: "", password: "", phone: "", role: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="authPage" style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <div
            style={{
              width: "50%",
              margin: "0 auto",
              backgroundColor: "#f5f5f5",
              padding: "2.5rem",
              borderRadius: ".625rem",
              boxShadow: "0 0 .625rem rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.875rem" }}>
              <img
                src="/JobZeelogo.png"
                alt="logo"
                style={{ maxWidth: "9.375rem" }}
              />
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginTop: "1.25rem",
                  color: "#333",
                }}
              >
                Create a new account
              </h3>
            </div>
            <form
              onSubmit={handleRegister}
              style={{ maxWidth: "25rem", margin: "0 auto" }}
            >
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: "1rem", color: "#333" }}>
                  Register As
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: ".625rem",
                  }}
                >
                  <select
                    value={change.role}
                    name="role"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: ".625rem",
                      border: ".0625rem solid #ccc",
                      borderRadius: ".3125rem",
                      fontSize: "1rem",
                    }}
                  >
                    <option value="">Select Role</option>
                    <option value="employeer">Employer</option>
                    <option value="jobSeeker">Job Seeker</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: "1rem", color: "#333" }}>Name</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: ".625rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={change.name}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: ".625rem",
                      border: ".0625rem solid #ccc",
                      borderRadius: ".3125rem",
                      fontSize: "1rem",
                    }}
                  />
                  <FaPencilAlt />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: "1rem", color: "#333" }}>
                  Email Address
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: ".625rem",
                  }}
                >
                  <input
                    type="email"
                    placeholder="zk@gmail.com"
                    value={change.email}
                    name="email"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: ".625rem",
                      border: ".0625rem solid #ccc",
                      borderRadius: ".3125rem",
                      fontSize: "1rem",
                    }}
                  />
                  <MdOutlineMailOutline />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: "1rem", color: "#333" }}>
                  Phone Number
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: ".625rem",
                  }}
                >
                  <input
                    type="number"
                    placeholder="12345678"
                    value={change.phone}
                    name="phone"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: ".625rem",
                      border: ".0625rem solid #ccc",
                      borderRadius: ".3125rem",
                      fontSize: "1rem",
                    }}
                  />
                  <FaPhoneFlip />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: "1rem", color: "#333" }}>
                  Password
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: ".625rem",
                  }}
                >
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={change.password}
                    name="password"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: ".625rem",
                      border: ".0625rem solid #ccc",
                      borderRadius: ".3125rem",
                      fontSize: "1rem",
                    }}
                  />
                  <RiLock2Fill />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: ".75rem",
                  border: "none",
                  borderRadius: ".3125rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Register
              </button>
              <Link
                to={"/login"}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "1.25rem",
                  textDecoration: "none",
                  color: "#007bff",
                  fontSize: "1rem",
                }}
              >
                Login Now
              </Link>
            </form>
          </div>
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <img
            src="/register.png"
            alt="login"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: ".625rem",
              boxShadow: "0 0 .625rem rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </section>
    </div>
  );
}
