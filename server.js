import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from "dotenv"
import { testUserController } from './controllers/testController.js'
import { connectDB } from './config/db.js'


// import { registerController } from './controllers/authControllers.js'
import { router as authRoute } from './routes/authRoute.js'
import {router as userRoute} from './routes/userRoute.js'
import {router as resturantRoute} from './routes/resturantRoute.js'
import {router as catagoryRoute}  from './routes/catagoryRoute.js'
import {router as foodRouter} from './routes/foodRoute.js'


//dotenv configuration -----
dotenv.config()

// Database connection ------
connectDB()

const app = express();

//middelwares -----------

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // to see in terminal which url has been hitted

// route ---
app.use('/api/v1/test',testUserController)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user',userRoute)
app.use('/api/v1/resturant',resturantRoute)
app.use('/api/v1/catagory',catagoryRoute)
app.use('/api/v1/food',foodRouter)


app.get('/', (req, res) => {
    return res.status(200).send('express configured successfully')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running successfully on ${PORT}`)
})


 