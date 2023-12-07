const Admin = require("../../models/AdminModel");
const User = require('../../models/UserModel')
const CatchAsync = require("../../util/CatchAsync");
const bcrypt = require("bcrypt");


const securePassword = async (password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
};

exports.verifyAdminLogin = CatchAsync(async (req, res) => {
  const { email, password } = req.body;
//   const secPassword = await securePassword(req.body.password);
  const admin =await Admin.findOne({email})

  if (admin) {
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (passwordMatch) {
        return res.status(200).json({success:'Login successfull'})
    } else {
        return res.status(200).json({error:'Incorrect password'})
    }
  } else {
     return res.status(200).json({error:'Invalid email'})
  }
});

exports.getUsers = CatchAsync(async (req,res)=>{
  const users = await User.find({})
   if(users){
    return res.status(200).json({success:'ok',users})
   }
}) 


exports.blockUser = CatchAsync(async (req,res)=>{
  console.log('hy')
  if(req.body.id){
    const user = await User.findById(req.body.id)
     const blockUser = await User.findByIdAndUpdate({_id:req.body.id},{$set:{isBlocked:!user.isBlocked}}, {new:true})
     if(blockUser.isBlocked){
       return res.status(200).json({success:`${blockUser.username} is blocked`})
     }else{
       return res.status(200).json({success:`${blockUser.username} is unblocked`})
     }
     
  }else{
    res.status(400).json({error:'credentials missing,failed to updated'})
  }
})
