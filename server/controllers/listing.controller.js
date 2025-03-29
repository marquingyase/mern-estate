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
    images,
    user,
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
      discountedPrice
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
