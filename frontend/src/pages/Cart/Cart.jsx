import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCartAll, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Sản phẩm</p>
          <p>Tên món</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng tiền</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img
                    className="cart-items-img"
                    src={url + "/images/" + item.image}
                    alt=""
                  />
                  <p>{item.name}</p>
                  <p>{item.price.toLocaleString("vi-VN")} đ</p>
                  <p>{cartItems[item._id]}</p>
                  <p>
                    {(item.price * cartItems[item._id]).toLocaleString("vi-VN")}{" "}
                    đ
                  </p>
                  {/* <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p> */}
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => removeFromCartAll(item._id)}
                  >
                    Xóa
                  </button>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Giỏ hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Giá sản phẩm</p>
              <p>{getTotalCartAmount().toLocaleString("vi-VN")} đ </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí vận chuyển</p>
              <p>
                {(getTotalCartAmount() === 0 ? 0 : 14000).toLocaleString(
                  "vi-VN"
                )}{" "}
                đ
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng tiền</b>
              <b>
                {(getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 14000
                ).toLocaleString("vi-VN")}{" "}
                đ
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>Đặt hàng</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p className="promocodep">Nhập mã giảm giá</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Mã giảm giá..." />
              <button>Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
