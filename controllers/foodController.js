// create food const create food controller

import { Food } from "../models/foodModel.js";
import { Order } from "../models/orderModel.js";

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      discription,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !discription || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const newFood = new Food({
      title,
      discription,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Iteem Created Successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create food api",
    });
  }
};

//Get all Foods

const getAllFoodsController = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items are present",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all food api",
      error,
    });
  }
};

// get single food ----

const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food Id",
      });
    }

    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found with this id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messsage: "Error in get single food api",
      error,
    });
  }
};

//get food by resturant

const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide resturant Id",
      });
    }

    const food = await Food.find({ resturant: resturantId });

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food based on resturant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messsage: "Error in get single food api",
      error,
    });
  }
};

// update food items ------

const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;

    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "please provide food id",
      });
    }

    const food = await Food.findById(foodID);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }

    const {
      title,
      discription,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    const updatedfood = await Food.findByIdAndUpdate(
      foodID,
      {
        title,
        discription,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Food item has been updated",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update food api",
      error,
    });
  }
};

//Delete food
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Provide food id",
      });
    }
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }

    await Food.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};
//place order ----

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please provide card & payment",
      });
    }
    //CALCULATION --------
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new Order({
      foods: cart,
      payment: total,
      buyers: req.body.id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
      error,
    });
  }
};

//change order status -----
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide order id",
      });
    }

    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status API",
      error,
    });
  }
};

export {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
