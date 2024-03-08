const mongoose =require('mongoose')
const { Schema } = mongoose;
const UserdetailSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
        // pattern :including @ : regular expression; .com
    },
    mobile:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
                //custom logic 
                return value.length == 10;
            },
            message: "Mobile Number should be equal to 10 digits"
        }
    },
    password: {
        type: String,
        required: true,
        //pattern : custom validation ;
        //custom validaton : we want to check whether password length greater than 7;
        validate: {
            validator: function (value) {
                //custom logic 
                return value.length > 7;
            },
            message: "Password should be greater than 7 characters"
        }

    },
    profilepic:
    {
        type:String,
        default:"user.png"
    }
    // custom schema ;

},{
    timestamps:true
})

const UserModel = mongoose.model('eAuctionUsers', UserdetailSchema);

module.exports=UserModel;