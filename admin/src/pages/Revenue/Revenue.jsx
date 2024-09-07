import React, { useEffect, useState } from "react";
import axios from "axios";

const Revenue = ({ url }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [categoryRevenue, setCategoryRevenue] = useState({});
  const [itemRevenue, setItemRevenue] = useState({});

  // Gọi API để lấy tổng doanh thu
  const fetchTotalRevenue = async () => {
    try {
      const response = await axios.get(`${url}/api/order/revenue/total`);
      if (response.data.success) {
        setTotalRevenue(response.data.totalRevenue);
      }
    } catch (error) {
      console.log("Error fetching total revenue:", error);
    }
  };

  // Gọi API để lấy doanh thu theo mặt hàng (danh mục)
  const fetchCategoryRevenue = async () => {
    try {
      const response = await axios.get(`${url}/api/order/revenue/category`);
      if (response.data.success) {
        setCategoryRevenue(response.data.categoryRevenue);
      }
    } catch (error) {
      console.log("Error fetching category revenue:", error);
    }
  };

  // Gọi API để lấy doanh thu theo món ăn
  const fetchItemRevenue = async () => {
    try {
      const response = await axios.get(`${url}/api/order/revenue/item`);
      if (response.data.success) {
        setItemRevenue(response.data.itemRevenue);
      }
    } catch (error) {
      console.log("Error fetching item revenue:", error);
    }
  };

  // Gọi tất cả các API khi component được mount
  useEffect(() => {
    fetchTotalRevenue();
    fetchCategoryRevenue();
    fetchItemRevenue();
  }, []);

  return (
    <div className="revenue">
      <h2>Doanh thu</h2>

      {/* Hiển thị tổng doanh thu */}
      <div className="total-revenue">
        <h3>Tổng doanh thu:</h3>
        <p>{totalRevenue.toLocaleString()} VND</p>
      </div>

      {/* Hiển thị doanh thu theo mặt hàng */}
      <div className="category-revenue">
        <h3>Doanh thu theo mặt hàng:</h3>
        <ul>
          {Object.entries(categoryRevenue).map(([category, revenue]) => (
            <li key={category}>
              {category}: {revenue.toLocaleString()} VND
            </li>
          ))}
        </ul>
      </div>

      {/* Hiển thị doanh thu theo món */}
      <div className="item-revenue">
        <h3>Doanh thu theo món:</h3>
        <ul>
          {Object.entries(itemRevenue).map(([item, revenue]) => (
            <li key={item}>
              {item}: {revenue.toLocaleString()} VND
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Revenue;
