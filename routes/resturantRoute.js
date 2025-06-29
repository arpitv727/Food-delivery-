import express from "express";

import authMiddelware from "../middelwares/authMiddelware.js";
import { createResturantController, deleteResturantController, getAllResturantController, getResturantByIdController } from "../controllers/resturantController.js";

const router = express.Router()

//Routes ----

//create resturant -----
router.post('/create',authMiddelware,createResturantController)

//Get all returants list -----

router.get('/getAll' , getAllResturantController)

//get resturant by id-----

router.get('/get/:id', getResturantByIdController)

//delete resturant ----

router.delete('/delete/:id',authMiddelware ,deleteResturantController)

export {router}