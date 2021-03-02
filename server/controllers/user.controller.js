const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretOrKey = process.env.secretOrKey;

exports.userRegister = async (req, res) => {
  const { name, email, phonNumber, password } = req.body;

  const searchRes = await User.findOne({ email });

  console.log(searchRes);

  if (searchRes) return res.status(404).json({ msg: "User Already exist" });

  try {
    const newUser = new User({
      name,
      email,
      phonNumber,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    newUser.password = hash;

    await newUser.save();

    await res.status(201).json({ msg: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `User add failed` });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  try {
    if (!user) return res.status(401).json({ msg: "Wrong email" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phonNumber,
    };

    const token = await jwt.sign(payload, secretOrKey);

    res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "User login failed" });
  }
};
