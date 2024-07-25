const express = require('express');
const router=express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sharmadev13579@gmail.com',
        pass: 'cfiimbhksvmvqihq'
    },
});

router.post('/send-email', (req, res) => {
    const { to, subject, text,html } = req.body;
    console.log(to);


    const mailOptions = {
        from:'sharmadev13579@gmail.com',
        to:to,
        subject:subject,
        text:text,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

module.exports=router;