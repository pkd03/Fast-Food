import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/food/${id}`);
  };
  return (
    <div className="food-item" onClick={handleClick}>
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
      </div>
      <div className="food-item-info" onClick={handleClick}>
        <div className="food-item-name-rating">
          <p className="food-name">{name}</p>
        </div>
        <p className="food-item-price">{price} đ</p>
      </div>
      {/* <div className='food-item' onClick={handleClick}>
            <img src={url+"/images/"+image} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: ${price}</p>
        </div> */}
    </div>
  );
}

export default FoodItem;
