import { User } from "../models/user.models.js"
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";


//register user ----
const registerController = async (req, res) => {

    try {
        const { username, email, password, address, phone , answer, userType  } = req.body

        //validation ----
        if (!username || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                success: false,
                message: 'please Provide all the fields'
            })

        }

        //hasing password ---
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // check user is registered or not -----
        const existing = await User.findOne({ email })

        if (existing) {
            return res.status(500).send({
                success: false,
                message: " Email is Already Registered please login"
            })
        }

        // create new user ------
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
            userType
        })

        res.status(201).send({
            success: true,
            message: "Successesfully registered",
            user,
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in register API",
            error
        })


    }

};

//Login -----

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body
       
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Pease enter email and password"
            });
        }
        // check user
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid email"
            })
        }

        //check user password
 const isMatch = await bcrypt.compare(password, user.password)

if(!isMatch){
    return res.status(500).send({
        success: false,
        message: "wrong password"
    })
}

//token ---- making on the basis of id
const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn: '7d',
})

user.password = undefined;

        res.status(200).send({
            success: true,
            message: "successfully loged in",
            token,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Unable to login ",
            error
        })
    }
}

export { registerController, loginController }