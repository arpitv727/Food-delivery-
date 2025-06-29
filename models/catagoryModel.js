
import mongoose from 'mongoose'

const catagorySchema = new mongoose.Schema(
    {

title : {
    type:String,
    required : [true, 'catagory is required']
},
imageUrl:{
    type : String,
    default: 'https://www.google.com/imgres?q=food%20category%20image%20logo&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fmain-food-groups-macronutrients-vector_1308-130027.jpg%3Fsemt%3Dais_hybrid%26w%3D740&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Ffood-category&docid=e95TbXj6VZ4E1M&tbnid=zVLe4JOURirHDM&vet=12ahUKEwjj79CRk5mNAxU3SGcHHUYvGEsQM3oFCIMBEAA..i&w=740&h=738&hcb=2&ved=2ahUKEwjj79CRk5mNAxU3SGcHHUYvGEsQM3oFCIMBEAA'
}


    }, { timestamps: true })

export const Catagory = mongoose.model("Catagory", catagorySchema)