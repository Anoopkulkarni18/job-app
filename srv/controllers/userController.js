import User from "./../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtToken = (jwtObj) => {
  return jwt.sign(jwtObj, process.env.SECRET_KEY, { expiresIn: "7d" });
};

 export const verifyToken = async (req, res, next) => {
  try {
    
    const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const handleRegister = async (req, res, next) => {
  try {
    const { name, password, email, phone, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { statusCode: 409, message: "User already exits" };
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
      phone,
      role,
    });
    const token = jwtToken({ email, _id: newUser._id, role: newUser.role });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const handleLogin = async (req, res, next) => {
  try {
    
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      throw { statusCode: 409, message: "Invalid credentials" };
    }

    await bcrypt.compareSync(password, loginUser.password);
    const token = jwtToken({ email, _id: loginUser._id, role: loginUser.role });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req,res,next) => {
  try {
   
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
