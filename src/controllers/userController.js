const bcrypt = require("bcrypt");
const { getDB } = require("../config/db");
const session = require("express-session")
const transporter = require('../config/mailer');


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const db = getDB();
    const existingUser = await db.collection("user-signup").findOne({ email });

    if (!existingUser) {
      await db.collection("user-signup").insertOne({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      });
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const user = await db.collection("user-signup").findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // const token = jwtToken.sign(
    //   {
    //     id: user._id,
    //     email: user.email,
    //     firstName: user.firstName,
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    // res.cookie('token', token, {
    // httpOnly: true,
    // secure: false,
    // sameSite: 'Lax',
    // maxAge: 1000 * 60 * 60, 
    // });

    return res.status(200).json({ message: "User logged in successfully" });
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    const db = getDB();
    const user = await db.collection("user-signup").findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP password is:',
      text: `Your OTP code is: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);

      // 
      req.session.otp = otp;
      req.session.email = email;
      req.session.otpExpires= Date.now() + 5 * 60 * 1000;

      res.status(200).send({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(502).send({ message: 'Error sending OTP' });
    }
  } catch (error) {
    console.error('Error in /verify-email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.verifyOTP = async (req, res) => {

  console.log("This is verify Route")
  const {otp} = req.body;
  console.log('Received OTP:', otp);

  console.log("This is session OTP ", req.session.otp)

  if (!otp) {
    return res.status(400).json({ message: 'OTP is required' });
  }

  if (!req.session.otp || !req.session.otpExpires) {
    return res.status(404).json({ message: "OTP not found or expired. Please request again." });
  }

  if (Date.now() > req.session.otpExpires) {
    return res.status(410).json({ message: "OTP has expired. Please request again." });
  }

  if (otp === req.session.otp) {
    req.session.isVerified = true;
    req.session.otp = null;
    req.session.otpExpires = null;

    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(401).json({ message: 'Invalid OTP' });
  }
};