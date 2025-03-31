import Listing from "../models/listing.models.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return res.status(401).json({ message: "You are unauthorized" });
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

    res.status(201).json({
      message: "Updated successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return res.status(401).json({ message: "You are unauthorized" });
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .clearCookie("access_token")
      .status(201)
      .json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id) {
      return res.status(401).json({ message: "You are unauthorized" });
    }

    const listings = await Listing.find({ user: req.params.id });

    if (listings.length < 1) {
      return res.status(404).json({ message: "User has no listings" });
    }

    res.status(200).json({
      message: "User listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};
