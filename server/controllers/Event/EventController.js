const Event = require("../../models/EventModel");
const CatchAsync = require("../../util/CatchAsync");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const OtpMailer = require("../../util/OtpMailer");
const jwt = require("jsonwebtoken");

//hashing  password
const securePassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

exports.registerEvent = CatchAsync(async (req, res) => {
  console.log(req.body);
  const isEventExists = await Event.findOne({ email: req.body.email });
  if (isEventExists) {
    return res.json({ error: "Event already exists" });
  } else {
    const secPassword = await securePassword(req.body.password);
    const newOtp = randomString.generate({
      length: 4,
      charset: "numeric",
    });
    const event = new Event({
      title: req.body.eventName,
      email: req.body.email,
      ownerName: req.body.Ownername,
      place: req.body.place,
      phone: req.body.phone,
      altPhone: req.body.altPhone,
      services: req.body.services,
      officeAddress: req.body.officeAddress,
      password: secPassword,
      otp: { code: newOtp, generatedAt: Date.now() },
    });
    const eventData = await event.save();

    if (eventData) {
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

exports.verifyEventOtp = CatchAsync(async (req, res) => {
  const { otp, email } = req.body;
  const event = await Event.findOne({ email: email });
  const generatedAt = new Date(event.otp.generatedAt).getTime();
  if (Date.now() - generatedAt <= 30 * 1000) {
    if (otp === event.otp.code) {
      event.isVerified = true;
      event.otp.code = "";
      await event.save();
      return res.status(200).json({ success: "event registered successfully" });
    } else {
      return res.json({ error: "otp is invalid" });
    }
  } else {
    return res.json({ error: "otp expired" });
  }
});

exports.ResendOtpEvent = CatchAsync(async (req, res) => {
  console.log(req.body);
  if (!req.body.email) {
    return console.log("email missing");
  }
  const event = await Event.findOne({ email: req.body.email });
  const newOtp = randomString.generate({
    length: 4,
    charset: "numeric",
  });
  const options = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "EventSphere verification otp for Event",
    html: `<center> <h2>Verify Your Email </h2> <br> <h5>OTP :${newOtp} </h5><br><p>This otp is only valid for 1 minutes only</p></center>`,
  };
  await OtpMailer.sendMail(options)
    .then((res) => console.log("otp sended"))
    .catch((err) => console.log(err.message));

  event.otp.code = newOtp;
  event.otp.generatedAt = Date.now();
  await event.save();
  return res
    .status(200)
    .json({ success: "Otp Resended", email: req.body.email });
});

exports.verifyEventLogin = CatchAsync(async (req, res) => {
  console.log(req.body);
  const event = await Event.findOne({ email: req.body.email });
  if (!event) {
    return res.json({ error: "event not found" });
  }
  const isMatch = await bcrypt.compare(req.body.password, event.password);
  if (!isMatch) {
    return res.status(200).json({ error: "password is not matching" });
  }

  if (event.isBlocked) {
    return res.status(200).json({ error: "Sorry, event is blocked by admin" });
  }

  if (!event.isVerified) {
    await Event.findOneAndDelete({ email: req.body.email });
    return res
      .status(200)
      .json({ error: "Event Account Not Verified SignUp Again" });
  }

  const token = jwt.sign({ id: event._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).json({ success: "Login successful", token, event });
});

exports.updateEvent = CatchAsync(async (req, res) => {
  const { title, ownerName, place, services, officeAddress, phone, altPhone } =
    req.body;
  const updatedEvent = await Event.findByIdAndUpdate(
    { _id: req.eventId },
    {
      $set: {
        title,
        ownerName,
        place,
        officeAddress,
        services,
        phone,
        altPhone,
      },
    },
    { new: true }
  );

  if (updatedEvent) {
    return res
      .status(200)
      .json({ success: "event updated successfully", event: updatedEvent });
  }

  return res.json({ error: "event updation failed, try again" });
});

exports.updateEventProfile = CatchAsync(async (req, res) => {
  const event = await Event.findById(req.eventId);
  console.log(event);

  event.profile = req.body.profile;
  await event.save();
  return res
    .status(200)
    .json({ success: "profile updated successfully", event });
});

exports.addPost = CatchAsync(async (req, res) => {
  console.log(req.body);
  const event = await Event.findById(req.eventId);
  let data = {};
  if (req.body.post) {
    data.media = req.body.post;
  } else {
    return res.json({ error: "image is missing" });
  }
  if (req.body.location) data.location = req.body.location;
  if (req.body.description) data.description = req.body.description;

  event.post.push(data);
  await event.save();

  return res.status(200).json({ success: "posted Successfully", event });
});

exports.deletePost = CatchAsync(async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    { _id: req.eventId },
    { $pull: { post: { _id: req.body.id } } },
    { new: true }
  );

  if(event){
    return res.status(200).json({success:'post deleted',event})
  }
  return res.json({error:'delete post failed,try again'})
});
