import Listing from "../models/listing.models.js";

export const add = async (req, res, next) => {
  const {
    name,
    description,
    address,
    price,
    discountedPrice,
    bathrooms,
    bedrooms,
    furnished,
    parking,
    type,
    offer,
    user,
    images,
  } = req.body;
  try {
    const newListing = new Listing({
      name,
      description,
      address,
      price,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      images,
      user,
      discountedPrice,
    });
    await newListing.save();

    res.status(201).json({
      message: "Listing added successfully",
      data: newListing,
    });
  } catch (error) {
    next(error);
  }
};

export const addImgs = async (req, res, next) => {
  try {
    const images = req.files?.map((file) => file.path);

    if (!images || images.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    res.status(200).json({
      message: "Upoaded successfully",
      data: images,
    });
  } catch (error) {
    next(error);
  }
};
