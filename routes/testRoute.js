import express from 'express'
import { testUserController } from '../controllers/testController.js'

//router object ---
const router = express.Router()

router.get('/test-user',testUserController)



export {router}