export const uploadImage = async (req, res, next) => {
  try {
    const avatar = req.file.path;
    res.json({
      message: "Uploaded successfully",
      avatar: avatar,
    });
  } catch (error) {
    next(error);
  }
};
