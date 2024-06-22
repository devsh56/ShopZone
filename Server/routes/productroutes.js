const express=require("express");
const app=express();
const router=express.Router();
const Product=require("../Modal/Product");
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
router.post('/products/new' , async(req,res)=>{
    try{
        let {name , img , price , desc,user_id} = req.body;
        let pp=await Product.create({name , img , price , desc,user_id});
        console.log(pp);
       // req.flash('success' , 'Product added successfully');
       // res.redirect('/products');
       res.json({msg:'recieved'});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})



module.exports=router