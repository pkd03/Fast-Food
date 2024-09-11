import express from "express";
import {
  addFood,
  listFood,
  searchFood,
  // getFoodByCategory,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
// Route tìm kiếm món ăn theo tên (search)
foodRouter.get("/search", searchFood);

// Route lọc món ăn theo danh mục (category)
// foodRouter.get("/category", getFoodByCategory);
foodRouter.post("/remove", removeFood);

export default foodRouter;
