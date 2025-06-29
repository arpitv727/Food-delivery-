import express from "express";

import authMiddelware from "../middelwares/authMiddelware.js";
import {
  createFoodController,
  deleteFoodController,
  getAllFoodsController,
  getFoodByResturantController,
  getSingleFoodController,
  orderStatusController,
  placeOrderController,
  updateFoodController,
} from "../controllers/foodController.js";
import adminMiddelware from "../middelwares/adminMiddelware.js";

const router = express.Router();

//routes
// create food -----
router.post("/create", authMiddelware, createFoodController);

// get all foods ---------

router.get("/getAll", getAllFoodsController);

//get single food

router.get("/get/:id", getSingleFoodController);

// get food by resturant ----

router.get("/getByResturant/:id", getFoodByResturantController);

//update food item ----

router.put("/update/:id", authMiddelware, updateFoodController);

// delete food item ----
router.delete("/delete/:id", authMiddelware, deleteFoodController);

//Place order

router.post("/placeorder", authMiddelware, placeOrderController);

//Order Status -----

router.post('/orderstatus/:id',authMiddelware, adminMiddelware, orderStatusController)

export { router };
