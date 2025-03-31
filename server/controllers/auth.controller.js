import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    const usernameGenerate =
      username.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4);

    if (user) {
      if (user.email === email) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username: usernameGenerate,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(403)
        .json({ message: "User with this email does not exist" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(403).json({ message: "Invalid password" });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: pass, ...rest } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false, // only set cookie over HTTPS
        // expires: new Date(Date.now() + 3600000), // 1 hour
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

export const googleSignIn = async (req, res, next) => {
  const { email, username, avatar } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false, // only set cookie over HTTPS
          // expires: new Date(Date.now() + 3600000), // 1 hour
        })
        .status(200)
        .json({
          message: "User logged in successfully",
          user: rest,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        password: hashedPassword,
        email,
        avatar,
      });
      const newUserDetails = await newUser.save();

      const token = jwt.sign(
        {
          _id: newUserDetails._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const { password: pass, ...rest } = newUserDetails._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false, // only set cookie over HTTPS
          // expires: new Date(Date.now() + 3600000), // 1 hour
        })
        .status(200)
        .json({
          message: "User logged in successfully",
          user: rest,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User logged out" });
  } catch (error) {
    next(error);
  }
};
