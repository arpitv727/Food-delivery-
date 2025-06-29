import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

const getUserController = async (req, res) => {
    try {

        const user = await User.findById({ _id: req.body.id })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        // hide password ---
        user.password = undefined
        res.status(200).send({
            success: true,
            message: 'User get successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get User Api',
            error,
        })

    }

};

//Update user -----

const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await User.findById({ _id: req.body.id })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'user not found'
            })
        }

        //update ------
        const { username, address, phone } = req.body

        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        // save user -----

        await user.save()
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Update API',
            error

        })

    }

};

//Update User Password ----

const updatePasswordController = async (req, res) => {
    try {
        //find user ---
        const user = await User.findById({ _id: req.body.id })
        //vallidation ----

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not found'
            })
        }

        //get password from user ----

        const { oldPassword, newPassword } = req.body

        //vallidation --

        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please enter Provided old password and new passwrod"
            })
        }
        //check user password
        const isMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password"
            })
        }

        //hasing password ---
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword

        //saving password -----

        await user.save()

        res.status(200).send({
            success: false,
            message: "password updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in password Update API',
            error
        })

    }
}

//reset password ----

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message : " pleasse enter all fields"
            })

        }

        const user = await User.findOne({email,answer})

        if(!user){
            return res.status(500).send({
                success : false,
                message: 'User not found  or in valid answer'
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword

        await user.save()
        res.status(200).send({
            success:true,
            message: 'password reset successfully'

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in password reset api",
            error
        })

    }

}

//delete profile account -----

const deleteProfileController = async(req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'your account has been deleted successfully'
        })
    } catch (error) {
      console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Delete Profile API",
            error
        })
        
    }

}


export {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController
}
