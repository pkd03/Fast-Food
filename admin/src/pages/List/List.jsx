import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho tìm kiếm
  const [selectedCategory, setSelectedCategory] = useState("Tất cả"); // Thêm state cho danh mục

  const fetchList = async (category = "Tất cả") => {
    const response = await axios.get(
      `${url}/api/food/list?category=${category}`
    );
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList(selectedCategory); // Load lại danh sách sau khi xóa
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList("Tất cả"); // Mặc định hiển thị tất cả món
  }, []);

  const handleSearch = () => {
    const filteredList = list.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setList(filteredList);
  };

  return (
    <div className="list">
      {/* tìm kiếm */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm món bạn cần"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm khi người dùng nhập
            />
            <button className="btn btn-outline-success" type="submit">
              Tìm
            </button>
          </form>
        </div>
      </nav>
      {/* danh mục */}
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            onClick={() => {
              setSelectedCategory("Tất cả");
              fetchList("Tất cả");
            }}
            className={`nav-link ${
              selectedCategory === "Tất cả" ? "active" : ""
            }`}
          >
            Tất cả
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            onClick={() => {
              setSelectedCategory("Burger");
              fetchList("Burger");
            }}
            className={`nav-link ${
              selectedCategory === "Burger" ? "active" : ""
            }`}
          >
            Burger
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            onClick={() => {
              setSelectedCategory("Buriro");
              fetchList("Buriro");
            }}
            className={`nav-link ${
              selectedCategory === "Buriro" ? "active" : ""
            }`}
          >
            Buriro
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            onClick={() => {
              setSelectedCategory("Gà rán");
              fetchList("Gà rán");
            }}
            className={`nav-link ${
              selectedCategory === "Gà rán" ? "active" : ""
            }`}
          >
            Gà rán
          </button>
        </li>
      </ul>
      {/* list */}
      <div className="d-flex flex-wrap">
        {list.map((item, index) => {
          return (
            <div className="card m-3 col-lg-2 col-sm-4" key={index}>
              <img
                src={`${url}/images/` + item.image}
                className="card-img-top "
                alt={item.name}
              />
              <div className="card-body">
                <p className="name">{item.name}</p>
                <p className="card-text">Danh mục: {item.category}</p>
                <p className="card-text">
                  Giá: {(item.price * 1000).toLocaleString("vi-VN")} đ
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFood(item._id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
