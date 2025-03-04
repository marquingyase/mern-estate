import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
