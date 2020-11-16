const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config= require('config')
const{check,validationResult}=require('express-validator')
const auth = require('../middleware/auth')

const User = require('../models/User')

router.get('/',auth,async(req,res)=>{
    try{
        const user= await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.post('/',[
    check('email','Add email').isEmail(),
    check('password','Enter Password').exists()
],
async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}= req.body

    try{ 
        let user = await User.findOne({email})
        
    if(!user){
        return res.status(400).json({msg:'invalid credentials'})
    }
     const isMatch= await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        return res.status(400).json({msg:'invalid password'})
    }
    //send token
    const payload={
        user:{
            id:user.id
        },
    }
    jwt.sign(
        payload,
        config.get('jwtSecret'),
    {
        expiresIn:36000
    },
    (err,token)=>{
        if(err) throw err
        res.json({token})
    }
    )
}
    catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports= router