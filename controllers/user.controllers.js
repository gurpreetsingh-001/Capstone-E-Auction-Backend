const UserModel = require('../models/userSchema.model');
const bcryptPassword = require('../utils/bcryptPassword')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const RegisterUser = async (req, res) => {
    // registration logic 
    try {
        const { mobile,email, password, username } = req.body;
        const hashedPassword = await bcryptPassword(password)
        console.log(hashedPassword);
        const insertedData = await UserModel.create({
            email,
            password: hashedPassword,
            username,
            mobile
        })
       console.log(insertedData);
      return res.status(200).json({
            message: "data inserted successfully",
            insertedData
        })


    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }

}

const LoginUser = async (req, res) => {
    
    const { email, password } = req.body;
    if (!email  || !password) {
        return res.status(201).json({
            message: "Please enter all your credentails"
        })
    }

    const ifUser = await UserModel.findOne({ email: email });

    if (!ifUser) {
        return res.status(202).json({
            message: `User with this ${email} is not found !Please register.`
        })
    }

    // if (ifUser.password == password) {
    //     return res.json({
    //         message: `User with ${email} has been logged in`
    //     })
    // }
    const ismatchedPassword = await bcrypt.compare(password, ifUser.password);
    if (ismatchedPassword) {
        const token = jwt.sign({
            data: ifUser._id
        }, process.env.JWT_SECRETKEY, { expiresIn: '100h' });
        return res.status(200).json({
            message: `User is loggedin`,
            token
        })
    }
    res.status(203).json({
        message: `User is not able to login due to wrong password`
    })
}


const UpdateProfile = async(req,res)=>{
    try {
        const{username, email, mobile,password } = req.body;
        console.log(username,email,mobile,req.userId)

        const user  = await UserModel.findOne({_id:req.userId})

        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        if (username) {
            user.username = username;
          }
          if (email) {
            user.email = email;
          }
          if (mobile) {
            user.mobile = mobile;
          }
          if (password){
            const hashedPassword = await bcryptPassword(password);
            user.password= hashedPassword;

          }
          await user.save();
          return res
      .status(200)
      .json({ message: "Profile updated successfully", user });

    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }
}
   


const UpdateProfilePic = async(req,res)=>{
    try {
        const{profilepic } = req.body;
  //      console.log(username,email,mobile,req.userId)
console.log(profilepic);
        const user  = await UserModel.findOneAndUpdate(
            { _id:req.userId },
            { profilepic:profilepic }
        )

        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          return res
      .status(200)
      .json({ message: "Profile Pic updated successfully", user });

    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }
}


module.exports = {
    LoginUser,
    RegisterUser,
    UpdateProfile,
    UpdateProfilePic
};