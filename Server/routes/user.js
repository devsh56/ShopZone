const User = require("../Modal/user");
const router=require('express').Router();

router.post('/user/info/:id',async (req, res)=>{
    try{
        let {id} = req.params ;
       let user=User.findById(id);
        res.json({user}) ;
    }
    catch(e){
        res.status(500).render('error', {err : e.message}) ;
    }
})


module.exports = router ;