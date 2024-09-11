import React, { useState } from "react";
import "./Home.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Footer from "../../components/Footer/Footer";
import { assets } from "../../assets/assets";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <img className="header_img" src={assets.header_img} alt="" />
      <h1>Khám phá các món ăn của chúng tôi</h1>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <Footer />
    </div>
  );
};

export default Home;
