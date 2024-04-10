import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>TOP COMPANIES</h3>
        <div className="banner" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {companies.map((element) => (
            <div className="card" key={element.id} style={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", padding: "20px", maxWidth: "250px" }}>
              <div className="content" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <div className="icon" style={{ fontSize: "36px", marginRight: "10px" }}>{element.icon}</div>
                <div className="text">
                  <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{element.title}</p>
                  <p style={{ fontSize: "16px", color: "#555" }}>{element.location}</p>
                </div>
              </div>
              <button style={{ width: "100%", padding: "10px", border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Open Positions {element.openPositions}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
