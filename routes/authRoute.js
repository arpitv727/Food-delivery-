import express from 'express'
import { loginController, registerController } from '../controllers/authControllers.js'

const router = express.Router()

// routes -----
//REGISTER || POST

router.post('/register', registerController)

//Login Post---

router.post('/login',loginController)

export {router}