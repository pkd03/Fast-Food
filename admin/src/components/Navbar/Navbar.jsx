import React from "react";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img
        className="logo "
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
      />

      <>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              onClick={() => navigate("/add")}
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Thêm sản phẩm
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => navigate("/list")}
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Danh sách sản phẩm
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => navigate("/orders")}
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Quản lý đơn hàng
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => navigate("/revenue")}
              className="nav-link"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Xem doanh thu
            </button>
          </li>
        </ul>
      </>

      <img
        className="settings"
        onClick={() => navigate("/profile")}
        src={assets.settings}
        alt=""
      />
    </div>
  );
};

export default Navbar;
