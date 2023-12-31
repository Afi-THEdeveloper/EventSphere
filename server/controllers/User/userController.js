const User = require("../../models/UserModel");
const randomString = require("randomstring");
const OtpMailer = require("../../util/OtpMailer");
const CatchAsync = require("../../util/CatchAsync");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

//hashing  password
const securePassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

exports.register = CatchAsync(async (req, res) => {
  console.log(req.body);
  const isUserExists = await User.findOne({ email: req.body.email });
  if (isUserExists) {
    return res.json({ error: "user already exists" });
  } else {
    const secPassword = await securePassword(req.body.password);
    const newOtp = randomString.generate({
      length: 4,
      charset: "numeric",
    });
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: secPassword,
      otp: {code:newOtp,generatedAt:Date.now()}
    });
    const userData = await user.save();

    if (userData) {
      const options = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "EventSphere verification otp",
        html: `<center> <h2>Verify Your Email </h2> <br> <h5>OTP :${newOtp} </h5><br><p>This otp is only valid for 1 minutes only</p></center>`,
      };
      await OtpMailer.sendMail(options)
        .then((res) => console.log("otp sended"))
        .catch((err) => console.log(err.message));
      return res.status(200).json({ success: "ok", email: req.body.email });
    } else {
      res.status(404).json({ error: "user registration failed" });
    }
  }
});



exports.loginUser = CatchAsync(async (req,res)=>{
    console.log(req.body)
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(200).json({error:'user not found'})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch){ 
        return res.status(200).json({error:'password is not matching'})
    }

    if(user.isBlocked){
        return res.status(200).json({error:'Sorry, you are blocked by admin'})
    }

    if(!user.isVerified){
      await User.findOneAndDelete({email:req.body.email})
      return res.status(200).json({error:'Account Not Verified SignUp Again'})
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
    delete user.password
    res.status(200).json({ success: "Login successful", token, user })
})



exports.VerifyOtp = CatchAsync(async (req, res) => {
  const {otp,email} = req.body
  const user = await User.findOne({ email: email });
  const generatedAt = new Date(user.otp.generatedAt).getTime();
  console.log(Date.now())
  console.log(generatedAt)  
  if(Date.now() - generatedAt <= 30 * 1000){
    if(otp === user.otp.code) {
      user.isVerified = true
      user.otp.code = ''
      await user.save()
      return res.status(200).json({ success: "user registered successfully" });
    } else {
      return res.json({ error: "otp is invalid" });
    }
  }else{
    return res.json({error:'otp expired'})
  }
});


exports.ResendOtp = CatchAsync(async (req,res)=>{
  console.log(req.body)
  if(!req.body.email){
    return console.log('email missing') 
  }
  const user = await User.findOne({email:req.body.email})
  const newOtp = randomString.generate({
    length: 4,
    charset: "numeric",
  });
  const options = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "EventSphere verification otp for User",
    html: `<center> <h2>Verify Your Email </h2> <br> <h5>OTP :${newOtp} </h5><br><p>This otp is only valid for 1 minutes only</p></center>`,
  };
  await OtpMailer.sendMail(options)
    .then((res) =>  console.log('otp sended'))
    .catch((err) => console.log(err.message));

    user.otp.code = newOtp
    user.otp.generatedAt = Date.now()
    await user.save()
    return res.status(200).json({ success: "Otp Resended", email: req.body.email });  
})


