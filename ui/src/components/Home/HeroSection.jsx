import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className="heroSection" style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <div className="title" style={{ flex: 1, maxWidth: "45%", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "36px", lineHeight: "1.2" }}>Find a job that suits <br /> your interests and skills</h1>
          <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptate repellat modi quidem aliquid eaque ducimus ipsa et, facere mollitia!</p>
        </div>
        <div className="image" style={{ flex: 1, maxWidth: "45%" }}>
          <img src="/heroS.jpg" alt="hero" style={{ maxWidth: "100%", height: "auto", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} />
        </div>
      </div>
      <div className="details" style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        {details.map((element) => {
          return (
            <div className="card" key={element.id} style={{ margin: "0 10px", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", textAlign: "center", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
              <div className="icon" style={{ fontSize: "36px", marginBottom: "10px", color: "#007bff" }}>{element.icon}</div>
              <div className="content">
                <p style={{ fontSize: "24px", marginBottom: "5px", fontWeight: "bold" }}>{element.title}</p>
                <p style={{ color: "#777" }}>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
