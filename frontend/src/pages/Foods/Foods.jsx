import React, { useEffect, useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import axios from "axios";
// import { toast } from "react-toastify";

const Foods = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho tìm kiếm
  const [category, setCategory] = useState("All");

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
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Foods;
