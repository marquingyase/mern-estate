import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

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
