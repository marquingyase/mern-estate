import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Listing } from "../components/Listing";
import toast from "react-hot-toast";
import axios from "axios";
import { start, success, failure } from "../redux/user/userSlice";
import { Link } from "react-router";

export const ListingPage = () => {
  const [files, setFiles] = useState([]);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formDatas, setFormData] = useState({
    images: [],
  });

  const handleImageSubmit = async (e) => {
    // e.preventDefault();
    if (files.length > 0 && files.length + formDatas.images.length < 7) {
      dispatch(start());
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]); // Append each file separately
      }

      await axios
        .post("/api/listing/add-imgs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          dispatch(failure());
          toast.success(response.data.message);
          setFormData({
            ...formDatas,
            images: formDatas.images.concat(response.data.data),
          });
        })
        .catch((err) => {
          dispatch(failure());
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("You can only upload 6 images per listing");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(start());
  //     await axios
  //       .put(`/api/user/update-user/${user._id}`, formData, {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         toast.success(response.data.message);
  //         dispatch(success(response.data.user));
  //       });
  //   } catch (err) {
  //     dispatch(failure());
  //     toast.error(err.response.data.message);
  //   }
  // };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  return (
    <Listing
      setFiles={setFiles}
      handleImageSubmit={handleImageSubmit}
      formDatas={formDatas}
      loading={loading}
    />
  );
};
