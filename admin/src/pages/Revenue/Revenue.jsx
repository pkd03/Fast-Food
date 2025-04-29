import React, { useEffect, useState } from "react";
import "./Revenue.css";
import { toast } from "react-toastify";
import axios from "axios";

const Revenue = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [categoryRevenue, setCategoryRevenue] = useState({});
  const [productRevenue, setProductRevenue] = useState({});

  // Hàm lấy danh sách đơn hàng từ API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        const orders = response.data.data;
        setOrders(orders);

        // Tính tổng doanh thu từ các đơn hàng
        const total = orders.reduce((sum, order) => sum + order.amount, 0);
        setTotalRevenue(total);

        // Tính doanh thu theo danh mục và sản phẩm
        const categoryRev = {};
        const productRev = {};

        orders.forEach((order) => {
          order.items.forEach((item) => {
            // Doanh thu theo danh mục
            if (!categoryRev[item.category]) {
              categoryRev[item.category] = 0;
            }
            categoryRev[item.category] += item.price * item.quantity;

            // Doanh thu theo sản phẩm
            if (!productRev[item.name]) {
              productRev[item.name] = 0;
            }
            productRev[item.name] += item.price * item.quantity;
          });
        });

        setCategoryRevenue(categoryRev);
        setProductRevenue(productRev);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Tính phần trăm của mỗi danh mục hoặc sản phẩm
  const getPercentage = (amount) => ((amount / totalRevenue) * 100).toFixed(2);
  const getPercentage_ship = () =>
    (((orders.length * 14000) / totalRevenue) * 100).toFixed(2);

  return (
    <div className="revenue">
      <h2>Thống kê doanh thu</h2>
      <p>Tổng doanh thu: {totalRevenue.toLocaleString("vi-VN")} đ</p>
      <p>Tổng số đơn hàng: {orders.length}</p>

      <h3>Doanh thu theo danh mục</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Doanh thu</th>
            <th scope="col">Phần trăm</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(categoryRevenue).map(([category, revenue]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{revenue.toLocaleString("vi-VN")} đ </td>
              <td>{getPercentage(revenue)}%</td>
            </tr>
          ))}
          <tr>
            <td>Phí ship</td>
            <td>{(orders.length * 14000).toLocaleString("vi-VN")} đ</td>
            <td>{getPercentage_ship()}%</td>
          </tr>

          <tr>
            <td>Tổng doanh thu</td>
            <td>{totalRevenue.toLocaleString("vi-VN")} đ</td>
          </tr>
        </tbody>
      </table>
      <h3>Doanh thu theo sản phẩm</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Doanh thu</th>
            <th scope="col">Phần trăm</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(productRevenue).map(([product, revenue]) => (
            <tr key={product}>
              <td>{product}</td>
              <td>{revenue.toLocaleString("vi-VN")} đ </td>
              <td>{getPercentage(revenue)}%</td>
            </tr>
          ))}
          <tr>
            <td>Phí ship</td>
            <td>{(orders.length * 14000).toLocaleString("vi-VN")} đ</td>
            <td>{getPercentage_ship()}%</td>
          </tr>

          <tr>
            <td>Tổng doanh thu</td>
            <td>{totalRevenue.toLocaleString("vi-VN")} đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Revenue;
