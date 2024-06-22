const express = require('express') ;
const router = express.Router() ;
const Product = require('../Modal/Product');
const Review = require('../Modal/Review');

router.post('/product/review/:id/',async (req, res)=>{
    try{
        let {id} = req.params ;
        let {rating, comment} = req.body ;

        let foundProduct = await Product.findById(id) ;
        let review = new Review({rating, comment}) ;

        foundProduct.reviews.push(review) ;
        await review.save() ;
        await foundProduct.save() ;

       
        res.json({review}) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})


module.exports = router ;