import mongoose from 'mongoose'

// monfodb connection ----

const connectDB = async() => {

    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${mongoose.connection.host}`)
    } catch (error) {
        console.log('DB_Error', error )
    }

}

export {connectDB}