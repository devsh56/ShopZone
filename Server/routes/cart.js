
const express = require('express');
const router = express.Router() //mini instance
//const {isLoggedIn} = require('../middleware');
const Product = require('../Modal/Product');
const User = require('../Modal/user');

router.get('/user/cart', async (req, res) => {
    const { userId } = req.query; // Accessing query parameters using 'userId'
    console.log(userId);
    let user = await User.findById(userId).populate('cart');
    console.log(user);
    return res.json({ status: true, user });
});

router.post('/user/add/:productId', async(req,res)=>{
    try{
    let {productId} = req.params;
    let {user}=req.body;
    let userId = user._id ;
    console.log(userId);
    console.log(productId);
    let product = await Product.findById(productId);
    let user_1 = await User.findById(userId);
    user_1.cart.push(product);
    console.log(user_1);
    await user_1.save();
  //  res.send(sta)
 
    return res.json({ status: true});
    }
    catch(e){
        
    }
  //  res.redirect('/user/cart');
})
module.exports=router;