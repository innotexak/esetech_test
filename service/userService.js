const  JwtService = require("../helpers/jwt");
const profileSchema  = require("../models/userSchema")
const bcrypt = require('bcrypt');

 class UserService{

    //Registration method
    async register(req, res, Next){
    const { email, password } = req.body

    const isUser = await profileSchema.findOne({email})
    if(isUser) res.status(400).json({message:"User already exist", error:true, data:{}})

    const hashedPassword = await bcrypt.hash(password, 10)
    await profileSchema.create({...req.body, password: hashedPassword})

    res.status(201).json({message:"Account created successfully", error:false, data:{}})
    }


    //Login method
    async login(req, res, next){
        const {email, password} = req.body
        const isUser = await profileSchema.findOne({email})
        if(!isUser) res.status(400).json({message:"Invalid login credentials", error:true, data:{}})
        
        const isMatchPassword = await bcrypt.compare(password, isUser.password)
    
        if(!isMatchPassword) res.status(400).json({message:"Invalid login credentials", error:true, data:{}})


        const jwtPayload = {
            email:isUser.email,
            name:isUser.firstName
        }

        //Generate tokens
        const accessToken = await new JwtService().generateAt(jwtPayload)
        const refreshToken = await new JwtService().generateRt(jwtPayload)

        //Hash tokens
        const hashAt = await bcrypt.hash(accessToken, 10)
        const hashRt = await bcrypt.hash(refreshToken, 10)

        //Update db with tokens
        await  profileSchema.updateOne({_id:isUser._id}, {accessToken:hashAt, refreshToken:hashRt})
      
        res.cookie('token', accessToken, { http:true })
        res.status(200).json({message:"Login Successful", data:{userId:isUser._id}, error:false })
       
    }


    //Profile method
    async getProfile(req, res, next){

        const userId = req.query.userId
        if(!userId) return res.status(401).json({message:"User not login", error:false})
        const profile =  await profileSchema.findOne({_id:userId}, {tagline:1, createdAt:1, updatedAt:1,firstName:1, lastName:1, portfolio:1, socialAccount:1 })
    
        res.status(200).json({message:"Profile retrieved", data: profile, error:false})
    }


    //Logout method
    async logout(req, res, next){

        const userId = req.query.userId
        res.clearCookie('token')
        await  profileSchema.updateOne({_id:userId}, {accessToken:"", refreshToken:""})
        res.status(200).json({message:"Logout successful", error:false})
    }
}  

module.exports = UserService