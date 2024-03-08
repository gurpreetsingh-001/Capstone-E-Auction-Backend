const UserModel = require('../models/userSchema.model');


const DashboardDetails = async (req, res) => {
    console.log("From Dashboard controller" + req.userId);
    const user  = await UserModel.findOne({_id:req.userId},'username email mobile profilepic')
    console.log(user);
    //Error Handling : user found or not found
    return res.status(200).json({user})

}
module.exports = DashboardDetails
