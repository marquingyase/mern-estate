import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Profile } from "../components/Profile";
import toast from "react-hot-toast";
import axios from "axios";
import { start, success, failure, logout } from "../redux/user/userSlice";
import { Link } from "react-router";

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const avatarRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [listings, setListings] = useState([]);

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

  const handleUserDelete = async () => {
    try {
      dispatch(start());
      await axios
        .delete(`/api/user/delete-user/${user._id}`, {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(logout());
          toast.success(response.data.message);
        });
    } catch (err) {
      dispatch(failure());
      toast.error(err.response.data.message);
    }
  };

  const handleListingDelete = async (id) => {
    try {
      await axios
        .delete(`/api/listing/delete/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setListings(listings.filter((listing) => listing._id !== id));
          toast.success(response.data.message);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleListingUpdate = async (id) => {
    try {
      await axios
        .delete(`/api/listing/update/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(start());
      await axios
        .get("/api/auth/logout", {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          dispatch(logout());
        });
    } catch (err) {
      dispatch(failure());
      toast.error(err.response.data.message);
    }
  };

  const handleShowListing = async () => {
    try {
      dispatch(start());
      await axios
        .get(`/api/user/listings/${user._id}`, {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(failure());
          toast.success(response.data.message);
          setListings(response.data.data);
        });
    } catch (err) {
      dispatch(failure());
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <Profile
      loading={loading}
      avatarRef={avatarRef}
      setFile={setFile}
      user={user}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListingDelete={handleListingDelete}
      handleUserDelete={handleUserDelete}
      handleSignout={handleSignout}
      handleShowListing={handleShowListing}
      handleListingUpdate={handleListingUpdate}
      Link={Link}
      listings={listings}
    />
  );
};
