import Listing from "../models/listing.models.js";

export const addListing = async (req, res, next) => {
  try {
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
    if (user === req.user._id) {
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
    }
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

export const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this listing",
      });
    }

    await listing.deleteOne();

    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
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
    } = req.body;
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this listing",
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, {
      $set: {
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
      },
    });

    res.status(200).json({
      message: "Listing updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json({
      message: "Listing fetched successfully",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};
