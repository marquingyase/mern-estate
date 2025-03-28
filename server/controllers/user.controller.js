import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          avatar: req.file?.path,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.json({
      message: "Updated successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
