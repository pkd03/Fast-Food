import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FoodDetail.css";

const FoodDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 70);
  }, []);

  const { id } = useParams();
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  // State quản lý số lượng
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(id, quantity); // Thêm sản phẩm với số lượng hiện tại
    toast.success("Đã thêm vào giỏ hàng");
  };

  const handlePayment = () => {
    addToCart(id, quantity); // Thêm sản phẩm với số lượng hiện tại
    navigate("/order"); // Chuyển hướng đến trang thanh toán
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1); // Tăng số lượng
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1); // Giảm số lượng nhưng không nhỏ hơn 1
    }
  };

  const foodItem = food_list.find((item) => item._id === id);

  if (!foodItem) {
    return <div>Food item not found</div>;
  }

  return (
    <div className="food-detail">
      <div className="food-detail-image">
        <img
          src={"http://localhost:4000/images/" + foodItem.image}
          alt={foodItem.name}
        />
      </div>
      <div className="food-detail-info">
        <h2>{foodItem.name}</h2>
        <p>{foodItem.description}</p>
        <h2>Giá: {foodItem.price} đ</h2>

        <div className="food-detail-quantity">
          <h2>Số lượng</h2>
          <div className="quantity-control">
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <button onClick={handlePayment} className="btn_buy_now">
          Mua ngay
        </button>
        <button className="btn_add_to_cart" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FoodDetail;
