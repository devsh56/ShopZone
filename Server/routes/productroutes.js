const express=require("express");
const app=express();
const router=express.Router();
const Product=require("../Modal/Product");
const User=require("../Modal/user")
router.get('/product', async (req, res)=>{
    try{
        let products = await Product.find({}) ;
        // res.render('products/index', {products}) ;
        return res.json(products);
    }
    catch(e){
        res.status(500).json( {err : e.message}) ;
    }
    
})


router.get('/product/view/:id/', async (req, res)=>{
    try{
        let {id} = req.params ;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.json({foundProduct});}
    catch(e){
        res.status(500).json( {err : e.message}) ;
    }
})

// Form to edit the product
router.get('/product/update/:id/', async (req, res)=>{
    try{
        let {id} = req.params ;
        let foundProduct = await Product.findById(id) ;
        res.json( {foundProduct}) ;
    }
    catch(e){
        res.status(500).json({err : e.message}) ;
    }
})


router.post('/product/update/:id', async(req, res)=>{
    try{
        let {id} = req.params ;
        let {name, img, price, desc} = req.body ;
        await Product.findByIdAndUpdate(id, {name, img, price, desc});
        res.json({msg:'recieved'});
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})
router.post('/products/new', async (req, res) => {
    try {
        let { name, img, price, desc, userId } = req.body;
        console.log("Received User ID:", userId);

        let pp = await Product.create({ name, img, price, desc, author: userId });
        let user =await User.findById(userId);
        user.createdProducts.push(pp._id);
      //  console.log("User ID stored in Product:", pp.author);
        console.log(pp);
        await user.save();
        console.log(user);
        res.json({ msg: 'received' });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});
router.post('/product/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { data } = req.body;
      //  console.log(data);
      //  console.log(productId);
      //  console.log(data.id);
        // Validate user data
    //    if (!data || !data._id || !data.createdProducts) {
      //      return res.status(400).json({ message: 'Invalid user data' });
      //  }
       
        // Find the product by ID
        const product = await Product.findById(productId);
        const user=await User.findById(data.id);
        console.log(user);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user created the product
        if (!user.createdProducts.includes(productId)) {
            return res.status(403).json({ message: 'You do not have permission to delete this product' });
        }

        // Delete the product
        await Product.findByIdAndDelete(productId);

        // Remove the product ID from the user's createdProducts array
        await User.findByIdAndUpdate(data._id, {
            $pull: { createdProducts: productId }
        });

        res.status(200).json({ message: 'Product deleted successfully' , user});
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports=router