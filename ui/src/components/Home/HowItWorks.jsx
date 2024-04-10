import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks" style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "50px", fontSize: "32px" }}>How JobZee Works</h3>
          <div className="banner" style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
            <div className="card" style={{ padding: "30px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", maxWidth: "300px" }}>
              <FaUserPlus style={{ fontSize: "48px", marginBottom: "20px", color: "#007bff" }} />
              <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>Create Account</h4>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card" style={{ padding: "30px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", maxWidth: "300px" }}>
              <MdFindInPage style={{ fontSize: "48px", marginBottom: "20px", color: "#007bff" }} />
              <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>Find a Job/Post a Job</h4>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card" style={{ padding: "30px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", maxWidth: "300px" }}>
              <IoMdSend style={{ fontSize: "48px", marginBottom: "20px", color: "#007bff" }} />
              <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>Apply For Job/Recruit Suitable Candidates</h4>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
