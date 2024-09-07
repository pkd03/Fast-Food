import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Hàm lấy danh sách đơn hàng từ API
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  // Hàm cập nhật trạng thái đơn hàng
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order">
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="card mb-3" key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={assets.logo}
                  className="img-fluid rounded-start"
                  alt="Order Icon"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {order.address.firstName} {order.address.lastName}
                  </h5>
                  <p className="card-text">
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} x {item.quantity}
                        {idx !== order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {order.address.street}, {order.address.city},{" "}
                      {order.address.state}, {order.address.country} -{" "}
                      {order.address.zipcode}
                    </small>
                  </p>
                  <p className="card-text">
                    Số lượng sản phẩm: {order.items.length}
                  </p>
                  <p className="card-text">Tổng tiền: {order.amount} đ</p>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="form-select"
                  >
                    <option value="Food Processing">Đang xử lý</option>
                    <option value="Out for delivery">Đang giao hàng</option>
                    <option value="Delivered">Đã giao</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
