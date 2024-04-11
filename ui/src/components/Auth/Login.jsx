import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [change, setChange] = useState({
    email: "",
    password: "",
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
  const handleLogin = async (e) => {
    try {
      console.log("Login test");
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_URI}/api/v1/user/login`,
        change
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthorized(true);
      navigate("/");
      setChange({ email: "", password: "", role: "" });
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
              padding: "40px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <img
                src="/JobZeelogo.png"
                alt="logo"
                style={{ maxWidth: "150px" }}
              />
              <h3
                style={{ fontSize: "24px", marginTop: "20px", color: "#333" }}
              >
                Login To Your account
              </h3>
            </div>
            <form
              onSubmit={handleLogin}
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#333" }}>
                  Login As
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <select
                    value={change.role}
                    name="role"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#333" }}>
                  Email Address
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
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
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  />
                  <MdOutlineMailOutline />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#333" }}>
                  Password
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
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
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  />
                  <RiLock2Fill />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Login
              </button>
              <Link
                to={"/register"}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "20px",
                  textDecoration: "none",
                  color: "#007bff",
                  fontSize: "16px",
                }}
              >
                New User
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
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </section>
    </div>
  );
}
