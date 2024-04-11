import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/login");
  };

  return (
    <div>
      <nav
        style={{ backgroundColor: "#333", color: "#fff", padding: "10px 0" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <img
              src="./JobZee-logos__white.png"
              srcSet="./JobZee-logos__white.png 1x, ./JobZee-logos__white.png 2x"
              alt="Logo"
              style={{ maxWidth: "100px" }}
            />
          </div>

          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <li style={{ marginRight: "20px" }}>
              <Link
                to={"/"}
                onClick={() => {
                  setShow(false);
                }}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                HOME
              </Link>
            </li>
            <li style={{ marginRight: "20px" }}>
              <Link
                to={"/job/getall"}
                onClick={() => {
                  setShow(false);
                }}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                ALL JOBS
              </Link>
            </li>
            <li style={{ marginRight: "20px" }}>
              <Link
                to={"/applications/me"}
                onClick={() => {
                  setShow(false);
                }}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {user && user.role === "employeer"
                  ? "APPLICANTS APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "employeer" ? (
              <>
                <li style={{ marginRight: "20px" }}>
                  <Link
                    to={"/job/post"}
                    onClick={() => {
                      setShow(false);
                    }}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {" "}
                    POST JOB
                  </Link>
                </li>
                <li style={{ marginRight: "20px" }}>
                  <Link
                    to={"/job/me"}
                    onClick={() => {
                      setShow(false);
                    }}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {" "}
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {isAuthorized ? (
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            ) : (
              <li>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu
              onClick={() => {
                setShow(!show);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
