const User = require("../Modal/user");
const bcrypt = require("bcrypt");
const router=require('express').Router();

const generateAuthToken=require("../generatetoken");

router.post('/login',async (req,res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
       // delete user.password;
      //  User.save(user);
    let token=generateAuthToken(user);
    console.log(token);
        return res.json({ status: true, token , user});
    } catch (e) {
        console.log("something went wrong");
}
})

router.post('/register',async(req,res)=>{
    try {
        const { username, email, password ,role} = req.body;
        const usernameCheck = await User.findOne({ username });
        const roleff=await User.findOne({role});
        console.log(roleff);
        if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
        email,
        username,
        password: hashedPassword,
        role,
        });
       // delete user.password;
        await user.save();
        console.log(user);
       // res.redirect('/login');
    
        return res.json({ status: true, });
    } catch (e) {
        console.log(e);
    }
})

module.exports=router;

