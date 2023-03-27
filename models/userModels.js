const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true, "Please Enter your password"],
        select:false,
    },
    pic: {
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    about: {
        type: String,
    }
});

//    we hashing the password...
userSchema.pre('save',async function (next){
    console.log("hi bcrypt")
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password, 12)
    }
    next();
})

//  we are generating tokens




const User = mongoose.model('user',userSchema);
module.exports=User;