import JWT from 'jsonwebtoken'

export default async (req, res, next) => {
    try {
// get token
        const token = req.headers["authorization"].split(" ")[1]


        
        
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                res.status(401).send({
                    success: "false",
                    message: "Un-Authorized User"
                })
            }else{
               req.body.id = decode.id;
               next()
            }
        })
      
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Please provide auth token',
        error,
      })
    }
  };
  