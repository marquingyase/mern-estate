export const Listing = ({ loading, listing, Swiper, SwiperSlide }) => {
  return (
    <main>
      {loading && <p className="text-2xl text-center my-12">Loading</p>}
      {listing && (
        <>
          <Swiper navigation>
            {listing.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[550px"
                  style={{
                    background: `url(${image}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};
