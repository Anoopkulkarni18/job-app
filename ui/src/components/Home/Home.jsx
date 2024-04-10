import React, { useContext } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

export default function Home() {
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();
  if (!isAuthorized) {
    navigate("/login");
  }
  return <div>
    <HeroSection/>
    <HowItWorks/>
    <PopularCategories/>
    <PopularCompanies/>
  </div>;
}
