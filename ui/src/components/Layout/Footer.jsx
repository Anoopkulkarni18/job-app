import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={isAuthorized ? "footerShow" : "footerHide"}
    >
      <div style={{ flexGrow: 1 }}>&copy; All Rights Reserved With Anoop</div>
      <div style={{ display: "flex" }}>
        <Link
          to={"/"}
          target="_blank"
          style={{ color: "#fff", marginRight: "10px" }}
        >
          <FaFacebook />
        </Link>
        <Link
          to={"/"}
          target="_blank"
          style={{ color: "#fff", marginRight: "10px" }}
        >
          <FaYoutube />
        </Link>
        <Link
          to={"/"}
          target="_blank"
          style={{ color: "#fff", marginRight: "10px" }}
        >
          <FaLinkedin />
        </Link>
        <Link to={"/"} target="_blank" style={{ color: "#fff" }}>
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
}
