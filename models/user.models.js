import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    username: {
        type : String,
        required : [true , "user name is required "]
    },
    email:{
        type: String,
        required :[true , ' email is required'],
        unique : true,
    },
    password: {
      type: String,
      required : [true , 'password is required']  
    },
    address: {
        type : Array,

    },
    phone: {
        type: String,
    }, userType: {
        type:String,
        required : [ , ' user type is required'],
        default : 'client',
        enum : ['client','admin','vendor','driver']
    },
    profile:{
        type : String,
        default : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_149071&psig=AOvVaw3rnXrHDAzNnNhEGQVTW3Jr&ust=1743759132276000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiHqJDHu4wDFQAAAAAdAAAAABAJ'
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }


},{timestamps:true})


export const User = mongoose.model("User",userSchema)

