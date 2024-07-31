import User from "../Models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.fullname ||
      !body.email ||
      !body.phoneNumber ||
      !body.password ||
      !body.role
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        meassage: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "registered successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!body.email || !body.password || !body.role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        meassage: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        meassage: "Incorrect email or password",
        success: false,
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "Acoount does not exist with this role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.SEKCRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        samSite: "strict",
      })
      .json({
        message: `welcome ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const skillsArray = skills.split(",");

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: true,
      });
    }

    //data updation

    (user.fullname = fullname),
      (user.email = email),
      (user.phoneNumber = phoneNumber),
      (user.bio = bio),
      (user.profile.skills = skillsArray),

      await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { register, login, logout, updateProfile };
