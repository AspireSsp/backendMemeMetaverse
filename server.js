const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require('./config/dbConnect');

// configuring the port
// database connection
connectDB()

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const path = require('path');

// app.use(cors());
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
// app.set("trust proxy", 1)

app.use(cookieParser());

//    route are import here..
const user = require("./routes/userRoutes");
const post = require("./routes/post");


app.use("/api/v1", user);
app.use("/api/v1", post);
const port = process.env.PORT || 5000 ;

// 3: for heroku
// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"))
// }
// if (process.env.NODE_ENV === "production") {
    // app.use(express.static("build"));
    // app.get("*", (req, res) => {
    //     console.log(__dirname);
    //   res.sendFile(path.resolve(__dirname + "/client/build/"+ "index.html"));
    // });
  // }
app.listen(port, ()=>{
    console.log(`server is running on port  ${port}`);
});
