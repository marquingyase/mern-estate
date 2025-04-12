import { useParams } from "react-router";
import { Listing } from "../components/Listing";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt, FaBath, FaBed, FaParking, FaChair } from "react-icons/fa";

export const ListingPage = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      await axios
        .get(`/api/listing/${params.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          setListing(response.data.data);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.data.message);
          console.log(error.response);
        });
    };
    fetchListing();
  }, [params.id]);

  return (
    <Listing
      listing={listing}
      Swiper={Swiper}
      SwiperSlide={SwiperSlide}
      loading={loading}
      FaMapMarkerAlt={FaMapMarkerAlt}
      FaBath={FaBath}
      FaBed={FaBed}
      FaParking={FaParking}
      FaChair={FaChair}
    />
  );
};
