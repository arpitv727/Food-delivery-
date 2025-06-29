import { User } from "../models/user.models.js";

export default async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only admin access",
      });
    } else {
        next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-Authorised Access",
      error,
    });
  }
};
