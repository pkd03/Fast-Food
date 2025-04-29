import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price.toLocaleString("vi-VN")}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
// import React, { useContext } from 'react'
// import { assets } from '../../assets/assets'
// import { useParams,useNavigate  } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext'
// import './FoodDetail.css'
// import { useEffect } from 'react';

// const FoodDetail = () => {
//     useEffect(() => {
//     window.scrollTo(0, 70);
//     }, []);
//     const { id } = useParams()
//     const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
//     const { food_list } = useContext(StoreContext)
//     const navigate = useNavigate()
//     const handleAddToCart = () => {
//       addToCart(id) // Thêm sản phẩm vào giỏ hàng
//       navigate('/cart') // Chuyển hướng đến trang giỏ hàng
//   }
//     const handlePayment = () => {
//         addToCart(id)
//         navigate('/order') // Redirect to cart page
//     }
//     const foodItem = food_list.find(item => item._id === id)

//     if (!foodItem) {
//         return <div>Food item not found</div>
//     }

//     return (
//         <div className="food-detail">
//         <div className="food-detail-image">
//           <img src={"http://localhost:4000/images/" + foodItem.image} alt={foodItem.name} />
//         </div>
//         <div className="food-detail-info">
//           <h2>{foodItem.name}</h2>
//           <p>{foodItem.description}</p>
//           <h2>Giá: {foodItem.price} đồng</h2>
//           <div className="food-detail-quantity">
//             <h2>Số lượng</h2>
//           </div>
//           <button onClick={handlePayment}>Mua ngay</button>
//           <button className='btn_add_to_cart' onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
//         </div>
//       </div>
//     )
// }
