import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      if ((user.username === username) & (user.email === email)) {
        return res
          .status(409)
          .json({ message: "Username and Email already exists" });
      }
      if (user.email === email) {
        return res.status(409).json({ message: "Email already exists" });
      }
      if (user.username === username) {
        return res.status(409).json({ message: "Username already exists" });
      }
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
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
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        // secure: true, // only set cookie over HTTPS
        // expires: new Date(Date.now() + 3600000), // 1 hour
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: {
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    next(error);
  }
};
