const express=require("express");
const app=express();

const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const seedDB = require("./seed");
//const Product = require("./Models/Product");
const Productroute = require('./routes/productroutes');
const Sendmail=require('./sendmail');
//const cors = require('cors');
//const reviewSchema=require("./Models/Review");
const reviewRoutes=require("./routes/reviewroutes")
const cartroute=require("./routes/cart");
const userroute=require("./routes/usser");

const authRoutes = require("./routes/auth");
const corsOptions = {
    origin: " http://localhost:3000", // Replace with the origin of your React app
    credentials: true,
};

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.json());


    mongoose
    .connect("mongodb://127.0.0.1:27017/Complete", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
    console.log("DB Connetion Successfull");
    })
    .catch((err) => {
    console.log(err.message);
    });

  

app.use(Productroute);
app.use(reviewRoutes);
app.use("/api/auth", authRoutes);
app.use(cartroute);
app.use(userroute);
app.use(Sendmail);


// seedDB();






app.listen('8080',()=>{
    console.log("connected sucessfully brother");
})