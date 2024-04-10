import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  return (
    <div className="categories" style={{ textAlign: "center", marginBottom: "50px" }}>
      <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>POPULAR CATEGORIES</h3>
      <div className="banner" style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        {categories.map((element) => (
          <div className="card" key={element.id} style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", padding: "20px", maxWidth: "200px" }}>
            <div className="icon" style={{ fontSize: "36px", marginBottom: "10px" }}>{element.icon}</div>
            <div className="text">
              <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{element.title}</p>
              <p style={{ fontSize: "16px", color: "#555" }}>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
