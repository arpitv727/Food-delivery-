// create resturant

import { Resturant } from "../models/resturantModel.js"

const createResturantController = async(req,res) => {

    try {
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body
        
        //vallidation ------
        if(!title||!coords){
           return res.status(500).send({
            success:false,
            message: 'Please provide title and address'
           }) 

        }
        const newResturent = new Resturant({title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords})

            await newResturent.save()

            res.status(200).send({
                success:true,
                message: 'new returant created successefully'

            })

    } catch (error) {
      console.log(error)  
      res.status(500).send({
        success:false,
        message:'Error in create Resturant api',
        error
      })
    }

}

//get all returant -----
const getAllResturantController = async(req,res) => {
  try {
   const resturants = await Resturant.find({})
   if(!resturants){
    return res.status(404).send({
      success: false,
      message : "No resturant available right now"

    });
   }
res.status(200).send({
  success : false,
  totalCount : resturants.length,
  resturants
})

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success : false,
      message: 'Error in auth api'
    })

  }

}

// get returant by id -----

const getResturantByIdController = async(req,res) => {

try {
  const resturantid = req.params.id

  if(!resturantid){
    return res.status(404).send({
      success : false ,
      message : 'please provide resturant id'

    })
    
  }

  //find resturant by id -----
  const resturant = await Resturant.findById(resturantid)

  if(!resturant){
    return res.status(404).send({
      success : false,
      message : 'no resturant found'
    })
  }
  res.status(200).send({
    success: true,
    resturant
  })
  
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message : 'Error in get returant api'
  })
  
}

}

// Delete resturant--------

const deleteResturantController = async(req,res) => {

  try {
    const resturantId = req.params.id

    if(!resturantId){
      return res.status(404).send({
        success : false,
        message: 'Please Provide resturant Id'
      })

    }
    
    await Resturant.findByIdAndDelete(resturantId)

    res.status(200).send({
      success :true,
      message: 'Resturant Deleted Successfully'
    })


    if(!resturantId) {
      return res.status(404).send({
        success:false,
        message  : ' Please provide resturant id bbbb'
      })
    }

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success : false,
      message : 'error in delet resturant api',
      error
    })
    
  }
  

}

export {
    createResturantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController

}