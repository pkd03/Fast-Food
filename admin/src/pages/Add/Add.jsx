import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "...",
  });

  // Xử lý sự kiện khi có thay đổi ở các ô nhập liệu
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Xử lý khi submit form
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi thêm sản phẩm!");
    }
  };

  return (
    <div className="add container  ">
      <form onSubmit={onSubmitHandler}>
        {/* Upload hình ảnh */}
        <div className="input-group mb-3 ">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            className="form-control"
            id="inputGroupFile02"
            required
          />
        </div>

        <div className="row g-3">
          {/* Tên sản phẩm */}
          <div className="col-md-6">
            <label htmlFor="productName" className="form-label">
              Tên sản phẩm
            </label>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              className="form-control"
              id="productName"
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>

          {/* Danh mục sản phẩm */}
          <div className="col-md-3">
            <label htmlFor="productCategory" className="form-label">
              Danh mục sản phẩm
            </label>
            <select
              onChange={onChangeHandler}
              name="category"
              className="form-select"
              id="productCategory"
              value={data.category}
              // placeholder="Chọn danh mục"
              required
            >
              <option>...</option>
              <option value="Burger">Burger</option>
              <option value="Burito">Burito</option>
              <option value="Gà">Gà </option>
              <option value="Hot dog">Hot dog</option>
              <option value="Pasta">Pasta</option>
              <option value="Salad">Salad</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Tart">Tart</option>
            </select>
          </div>

          {/* Giá sản phẩm */}
          <div className="col-md-3">
            <label htmlFor="productPrice" className="form-label">
              Giá
            </label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              // max="999"
              className="form-control"
              id="productPrice"
              placeholder="Nhập giá"
              required
            />
          </div>

          {/* Thông tin chi tiết sản phẩm */}
          <div className="col-12">
            <label htmlFor="productDescription" className="form-label">
              Thông tin chi tiết
            </label>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              className="form-control"
              id="productDescription"
              rows="4"
              placeholder="Nhập thông tin chi tiết"
              required
            />
          </div>

          {/* Nút thêm sản phẩm */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
