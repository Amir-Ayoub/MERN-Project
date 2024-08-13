import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { response } from "express";

//login user
const loginUser = async (req, response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return response.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    response.json({ success: true, token });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//register user
const registerUser = async (req, response) => {
  const { name, password, email } = req.body;
  try {
    // checking is user already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return response.json({ success: false, message: "User already exists" });
    }
    // validating email and strong password
    if (!validator.isEmail(email)) {
      return response.json({
        success: false,
        message: "Please enter valid email",
      });
    }

    //password >8 or not
    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // encrypt user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //save user in database
    const user = await newUser.save();
    const token = createToken(user._id);
    response.json({ success: true, token });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
