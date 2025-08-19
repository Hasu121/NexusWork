const AffiliatedCompany = require('../models/affiliatedCompany');
// Check if company is affiliated (for registration/login/Google login)
exports.checkCompany = async (req, res) => {
    try {
        const { company } = req.body;
        const exists = await AffiliatedCompany.exists({ name: company });
        return res.json({ exists: !!exists });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')



const cookieOptions = {
    httpOnly: true,
    secure: false,    // set false in production
    sameSite: 'Lax'   //set None in production, else Lax
}


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


{/* Google reg/login */}
exports.loginThroughGmail = async(req,res) =>{
    try{
        const { token, company } = req.body;
        
        // Check if company is provided
        if (!company) {
            return res.status(400).json({ error: "Company is required for Google login" });
        }
        
        // Check if company is affiliated
        const affiliatedCompany = await AffiliatedCompany.findOne({ name: company });
        if (!affiliatedCompany) {
            return res.status(400).json({ error: "Company is not affiliated. Please contact support." });
        }
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const {sub, email, name, picture} = payload;

        let userExist = await User.findOne({email});
        if (!userExist) {
            // Register new user with company
            userExist = await User.create({
                googleId: sub,
                email,
                f_name:name,
                profile_pic: picture,
                curr_company: company
            });
        } else {
            // Check if company matches for existing user
            if (userExist.curr_company !== company) {
                return res.status(400).json({ error: 'Company does not match your registered company' });
            }
        }
        
        let jwttoken = jwt.sign({ userId: userExist._id }, process.env.JWT_PRIVATE_KEY)
            res.cookie('token', jwttoken, cookieOptions);
            return res.status(200).json({ user: userExist })
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
}

{/* Register */}
exports.register = async(req, res)=>{
    try{
        const {email, password, f_name, company} = req.body;
        
        // Check if company is provided
        if (!company) {
            return res.status(400).json({ error: "Company is required for registration" });
        }
        
        // Check if company is affiliated
        const affiliatedCompany = await AffiliatedCompany.findOne({ name: company });
        if (!affiliatedCompany) {
            return res.status(400).json({ error: "Company is not affiliated. Please contact support." });
        }
        
        let isUserExist = await User.findOne({ email });
        if(isUserExist){
            return res.status(400).json({ error: "Already have an account with this email. Please try with other email."})
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new User({email, password:hashedPassword, f_name, curr_company: company})
        await newUser.save();

        return res.status(201).json({ message:"User registered successfully", success: "yes", data: newUser });

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
        
    }
}

{/* Login */}
exports.login = async(req,res) => {
    try{
        const {email, password, company} = req.body;
        
        // Check if company is provided
        if (!company) {
            return res.status(400).json({ error: "Company is required for login" });
        }
        
        const userExist = await User.findOne({email})
        
        if (!userExist) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }
        
        // Check if company matches user's current company
        if (userExist.curr_company !== company) {
            return res.status(400).json({ error: 'Company does not match your registered company' })
        }
        
        // Check if company is still affiliated
        const affiliatedCompany = await AffiliatedCompany.findOne({ name: company });
        if (!affiliatedCompany) {
            return res.status(400).json({ error: "Company is no longer affiliated. Please contact support." });
        }

        if(await bcryptjs.compare(password,userExist.password)){
            let token = jwt.sign({ userId: userExist._id }, process.env.JWT_PRIVATE_KEY)
            res.cookie('token', token, cookieOptions)
            return res.json({ message: "Logged in successfully", success: "True", userExist })
        }else{
            return res.status(400).json({ error: 'Invalid credentials' })
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
}


exports.updateUser = async(req,res)=>{
    try{
        const { user } = req.body;
        const isExist = await User.findById(req.user._id)
        if(!isExist) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        const updateData = await User.findByIdAndUpdate(isExist._id, user);
        

        const userData = await User.findById(req.user._id);
        return res.status(200).json({ message: 'User updated successfully', user: userData })
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
}

exports.getProfileByID = async(req,res) => {
    try {
        const { id } = req.params;
        const isExist = await User.findById(id);
        if (!isExist) {
            return res.status(400).json({ error: 'No Such User Exist!'})
        }
        return res.status(200).json({
            message: "User fetched successfully",
            user: isExist
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
}


exports.logout = async(req,res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' })
}

exports.findUser = async (req, res) => {
    try{
        let {query} = req.query;
        const users = await User.find({
            $and: [
                {_id: { $ne: req.user._id } },
                {
                    $or:[
                        { name: {$regex: new RegExp(`^${query}`, "i")}},
                        { email: {$regex: new RegExp(`^${query}`, "i")}}
                    ]
                }
            ]
        });
        return res.status(201).json({ 
            message: "Users fetched successfully",
            users:users
         });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
}