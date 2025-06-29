import express from "express";

import authMiddelware from "../middelwares/authMiddelware.js";
import { createCatController, deleteCatController, getAllCatController, updateCatController } from "../controllers/catagoryController.js";
import { deleteResturantController } from "../controllers/resturantController.js";

const router = express.Router()

// routes 

// create catagory -----

router.post('/create',authMiddelware,createCatController)

//Get all catagory ------------
router.get('/getAll',getAllCatController)

//update catagory -----

router.put('/update/:id',authMiddelware,updateCatController)


//delete catagory ----

router.delete('/delete/:id', authMiddelware ,deleteCatController)

export {router}