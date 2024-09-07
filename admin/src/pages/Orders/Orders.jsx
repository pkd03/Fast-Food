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
          <div className="card mb-3  " key={index}>
            <div className="m-3 g-0 ">
              {/* <div className="col-md-12"> */}
              <div className="card-body">
                <h5 className="card-title">
                  {order.address.firstName} {order.address.lastName}
                </h5>
                {/*  */}
                <div className="container">
                  <div className="row">
                    <p className="card-text col-lg-4">
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x {item.quantity}
                          {/* {idx !== order.items.length - 1 ? item + "\n" : ""} */}
                          {idx !== order.items.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                    <p className="card-text col-lg-4">
                      <small className="text-muted">
                        {order.address.street}, <br />
                        {order.address.city}, <br />
                        {order.address.state}, <br />
                        {order.address.country}
                      </small>
                    </p>

                    <p className="card-text col-lg-4">
                      Tổng tiền: {(order.amount * 1000).toLocaleString("vi-VN")}{" "}
                      đ
                    </p>
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className="form-select col-lg-2"
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đang giao hàng">Đang giao hàng</option>
                      <option value="Đã giao">Đã giao</option>
                    </select>
                  </div>
                  {/* </div> */}
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
