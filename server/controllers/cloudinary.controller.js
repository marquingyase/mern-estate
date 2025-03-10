import cloudinary from "../utils/cloudinary";

export const deleteImageFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Error deleting image:", error);
  }
};

export const extractPublicIdFromUrl = (url) => {
  // Assuming the URL is of the form:
  // https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/public-id.extension
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const pub = publicIdWithExtension.split(".")[0]; // Remove extension
  const publicId = "mern-estate/" + pub;
  return publicId;
};

export const uploadImageToCloudinary = (imageBuffer)=> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mern-estate" }, // Optional folder name
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else {
            resolve(result);
          }
        }
      );
      stream.end(imageBuffer); // End the stream with the image buffer
    });

};
