const express = require('express');
const router = express.Router();

const User = require("../models/userModels")

const bcrypt = require('bcryptjs');


// const localStorage = require('localstorage')

// router.get('/', (req, res)=>{
//     res.send("hello from server routerjs and home route get req");
// })


//    register router....
router.post('/register', async(req,res)=>{
    const {name, email, password, pic} = req.body;
    if(!name || !email|| !password){
        return res.status(422).json({Error: "Plz fill all the field properly.."})
    }
    try {
        const userExist = await User.findOne({email: email});
        if(userExist){
            return res.status(422).json({Error: "User exist"})
        }
        const user = new User({name, email, password, pic});

        await user.save();
            res.status(201).json({message:"success"})
    } catch (error) {
        console.log(err)
    }
  
})

// login router...
router.post('/login', async(req,res)=>{
    // console.log("hi backend..!");
     try {
         const {email, password} = req.body;
        //  console.log(req.body);
         if(!email || !password){
             return res.status(400).json({error: "fill proper details"})
         }
         const userLogin = await User.findOne({email}).select("+password");
         if(userLogin){
             const isMatch = await bcrypt.compare(password,userLogin.password);
             
             
             if(!isMatch){
                 console.log("password not match");
                res.status(400).json({error: "invailid login details"})
            }else{
                res.status(200).json({message:"login sucessfull" ,userLogin })
            }
        }else{
             res.status(400).json({error : "user error"}) 
         }
     } catch (error) {
         console.log(error);
     }
});

router.put('/update/:id', async(req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const update = await User.findByIdAndUpdate({_id : id}, body)
    const resulet = await User.find({_id : id});
    res.send(resulet);
})

router.get('/allUsers', async(req, res)=>{
    const users = await User.find();
    res.send(users);
})



//   logOut ka page 
router.get('/logOut', (req, res)=>{
    // console.log("hello from getData router");
    res.clearCookie('jwttoken', {path: '/'});
    res.status(200).send("user logOut");
})


module.exports = router;


































// const express = require('express');
// const { registerUser, loginUser } = require("../controller/userController");
// const router = express.Router();


// router.route("/register").post(registerUser)

// router.route("/login").post(loginUser)
 

// module.exports = router; 