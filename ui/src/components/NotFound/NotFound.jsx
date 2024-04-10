import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page notfound">
      <div className="content">
        <img src="notfound.png" alt="page notfound" />
        <Link to="/">Return To Home Page</Link>
      </div>
    </section>
  );
}
