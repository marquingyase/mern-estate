export const Listing = ({
  loading,
  listing,
  Swiper,
  SwiperSlide,
  FaMapMarkerAlt,
  FaBath,
  FaBed,
  FaParking,
  FaChair,
}) => {
  return (
    <main>
      {loading && <p className="text-2xl text-center my-12">Loading</p>}
      {listing && (
        <>
          <Swiper navigation>
            {listing.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${image}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.price.toLocaleString("en-US")
                : listing.discountedPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.price - +listing.discountedPrice}
                </p>
              )}
            </div>
            <p className="text-slate-700">
              <span className="font-semibold text-black">Description - </span>{" "}
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-4 flex-wrap">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} beds`
                  : `${listing.bathrooms} bed`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
          </div>
        </>
      )}
    </main>
  );
};
