// create catagory controller -----

import { Catagory } from '../models/catagoryModel.js'
const createCatController = async (req, res) => {


    try {
        const { title, imageUrl } = req.body

        //vallidation ------
        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'Please provide title and image'
            })
        }

        const newCatagory = new Catagory({ title, imageUrl })

        await newCatagory.save()
        res.status(201).send({
            success: true,
            message: 'Catagory has been created succesfully',
            newCatagory
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in catagory api',
            error
        })
    }

};

//Get all catagory ------

const getAllCatController = async (req, res) => {

    try {
const categories = await Catagory.find({})
if(!categories){
    return res.status(404).send({
        success:false,
        message: 'No catagory found'
    })
}

res.status(200).send({
    success:true,
    totalCat: categories.length,
    categories
})

    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success:false,
                message:'Error in get All catagory API',
                error

            })
    }

}

// update catagory controller ------

const updateCatController = async(req,res) => {
    try {
        
        const {id} = req.params
        const {title , imageUrl} = req.body

        const updateCategory = await Catagory.findByIdAndUpdate(
            id,
            {title, imageUrl},
            {new:true}
        )

        if(!updateCategory){
            return res.status(500).send({
                success:false,
                message:'No category found'
            })
        }
        res.status(200).send({
            success:true,
            message:"Category updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update cat api',
            error
        })
        
    }

}

//delete catagory

const deleteCatController = async(req,res) => {

    try {
        const CategoryId = req.params.id

        if(!CategoryId){
            return res.status(404).send({
                success:false,
                message:'Please provide cataegory Id'
            })
        }

        await Catagory.findByIdAndDelete(CategoryId)

        res.status(200).send({
            success:true,
            message:'Category Deleted successfully'
        })
        
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in deleteCategory API',
            error
        })
    }

}


export {
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController


}