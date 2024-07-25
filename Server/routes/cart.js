const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router() //mini instance
//const {isLoggedIn} = require('../middleware');
const Product = require('../Modal/Product');
const User = require('../Modal/user');
//const Product = require('../Modal/Product');

router.get('/user/cart', async (req, res) => {
    const { userId } = req.query; // Accessing query parameters using 'userId'
  //  console.log(userId);
    let user = await User.findById(userId).populate('cart');
  //  console.log(user);
    return res.json({ status: true, user });
});

router.post('/user/add/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { user } = req.body;
    const userId = user._id;
    
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    
    product.sold += 1;
    await product.save();

    let user_1 = await User.findById(userId);
    if (!user_1) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    const isInCart = user_1.cart.some(cartItem => cartItem.equals(product._id));
    if (!isInCart) {
      user_1.cart.push(product._id);
    }

    await user_1.save();

  //  console.log(user_1);
  //  console.log(product);
    return res.json({ status: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/user/cart/dele', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId).populate('cart');
    const product = await Product.findById(itemId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Decrement the sold count but ensure it does not go below zero
    product.sold = Math.max(0, product.sold - 1);
    await product.save();

    // Remove the product from the user's cart if the sold count is zero
    if (product.sold === 0) {
      user.cart = user.cart.filter(cartItem => !cartItem._id.equals(product._id));
    }
    await user.save();

    console.log("Updated User Cart:", user);
    console.log("Updated Product:", product);

    return res.json({ status: 'Cart updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports=router;