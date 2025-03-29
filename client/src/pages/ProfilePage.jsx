import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Profile } from "../components/Profile";
import toast from "react-hot-toast";
import axios from "axios";
import { start, success, failure, logout } from "../redux/user/userSlice";

export const ProfilePage = () => {
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
    dispatch(start());
    try {
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

  const handleDelete = async (e) => {
    e.preventDefault();
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
      toast.error(err.response.data.message);
      dispatch(failure(err.response.data.message));
    }
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`/api/user/delete-user/${user._id}`, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
        });
    } catch (err) {
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
      handleDelete={handleDelete}
      handleSignout={handleSignout}
    />
  );
};
