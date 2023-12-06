const Admin = require("../../models/AdminModel");
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
