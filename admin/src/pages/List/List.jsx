import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {list.map((item, index) => {
        return (
          <div className="card m-3" key={index} style={{ width: "18rem" }}>
            <img
              src={`${url}/images/` + item.image}
              className="card-img-top h-100"
              alt={item.name}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Danh mục: {item.category}</p>
              <p className="card-text">Giá: {item.price} đ</p>
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
  );
};

export default List;
