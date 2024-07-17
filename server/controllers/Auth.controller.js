import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
const maxAge = 3 * 24 * 60 * 60 * 1000;
import bcrypt from "bcrypt";
import { response } from "express";
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required");
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "User with this email already exist!",
      });
    }

    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSize: "None",
    });
    res.status(201).json({
      success: true,
      user: {
        email: user.email,
        id: user._id,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({success:false,message:"User not found"});
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return res.json({success:false,message:"Invalid Credentials"});

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({success:true,
      user: {
        email: user.email,
        id: user._id,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error");
  }
};
export { signup, login };
