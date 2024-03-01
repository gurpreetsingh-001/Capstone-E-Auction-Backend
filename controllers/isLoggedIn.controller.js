const jwt =require('jsonwebtoken')
async function isLogged(req,res,next){
    //headers
    //we recieve token from client in req.header authroization section;
    const token =req.header('Authorization');
    console.log(token);
   // console.log(token,"token here");

    if(!token){
        return res.status(401).json({
            message:"Unauthorized:no token provided"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
       // console.log(decoded.data,"from jwt handler");
        req.userId =decoded.data;
        return res.status(200).json({
            message:"User is verified"
            
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({
            message:"Something went wrong with tokens"
        })
    }

 

}


module.exports=isLogged;