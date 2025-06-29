import express from 'express'
import { deleteProfileController, getUserController, resetPasswordController, updatePasswordController, updateUserController } from '../controllers/userController.js'
import authMiddelware from '../middelwares/authMiddelware.js'


const router = express.Router()

//routes ---
//get User || get
router.get('/getUser',authMiddelware,getUserController);

//Update profile -----
router.put("/updateUser",authMiddelware,updateUserController);

// update password ----

router.post('/updatePassword',authMiddelware,updatePasswordController);

//reset password ----
router.post('/resetPassword', authMiddelware,resetPasswordController );

// delete user ----
router.delete('/deleteUser/:id',authMiddelware,deleteProfileController)


export {router}