import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Listing } from "../components/Listing";
import toast from "react-hot-toast";
import axios from "axios";
import { start, success, failure } from "../redux/user/userSlice";
import { Link } from "react-router";

export const ListingPage = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const avatarRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      async function handleSubmit() {
        dispatch(start());
        const formData = new FormData();
        formData.append("file", file);
        await axios
          .put(`/api/user/update-user/${user._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            toast.success(response.data.message);
            dispatch(success(response.data.user));
          })
          .catch((err) => {
            dispatch(failure());
            toast.error(err.response.data.message);
          });
      }

      handleSubmit();
    }
  }, [dispatch, file, user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(start());
      await axios
        .put(`/api/user/update-user/${user._id}`, formData, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          dispatch(success(response.data.user));
        });
    } catch (err) {
      dispatch(failure());
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return <Listing />;
};
