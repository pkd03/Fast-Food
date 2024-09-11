import foodModel from "../models/foodModel.js";
import fs from "fs";

// // Hàm định dạng số với dấu chấm
// const formatPrice = (price) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  // // Định dạng giá trước khi lưu
  // const formattedPrice = formatPrice(req.body.price);

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Đã thêm món" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    // // Định dạng lại giá khi trả về (nếu chưa được định dạng)
    // foods.forEach((food) => {
    //   food.price = formatPrice(food.price);
    // });
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//tìm kiếm food

const searchFood = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const foods = await foodModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Show items by category

// const getFoodByCategory = async (req, res) => {
//   try {
//     const category = req.query.category;
//     const foods = await foodModel.find({ category });
//     res.json({ success: true, data: foods });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Đã xóa món" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export {
  addFood,
  listFood,
  searchFood,
  // getFoodByCategory,
  removeFood,
};
