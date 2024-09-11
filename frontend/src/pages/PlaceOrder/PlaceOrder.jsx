import React, { useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    street: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 14000,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.success("Thanh toán thành công");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Thông tin vận chuyển</p>

          <input
            className="name"
            required
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Tên"
          />

          <textarea
            className="streett"
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="textarea"
            placeholder="Địa chỉ"
          />

          <input
            className="phonee"
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Số điện thoại"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Tiền hàng</p>
                <p>{getTotalCartAmount()} đ</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Phí vận chuyển </p>
                <p>{getTotalCartAmount() === 0 ? 0 : 14000} đ</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Tổng tiền</b>
                <b>
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 14000}{" "}
                  đ
                </b>
              </div>
            </div>
            <button type="submit">Thanh toán</button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default PlaceOrder;
