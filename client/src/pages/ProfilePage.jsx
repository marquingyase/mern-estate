import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Profile } from "../components/Profile";
import toast from "react-hot-toast";
import axios from "axios";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

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
        dispatch(updateUserStart());
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
            dispatch(updateUserSuccess(response.data.user));
          })
          .catch((err) => {
            dispatch(updateUserFailure(err.response.data.message));
            toast.error(err.response.data.message);
          });
      }

      handleSubmit();
    }
  }, [dispatch, file, user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`/api/user/update-user/${user._id}`, formData, {
          withCredentials: true
        })
        .then((response) => {
          toast.success(response.data.message);
          dispatch(updateUserSuccess(response.data.user));
        });
    } catch (err) {
      dispatch(updateUserFailure(err.response.data.message));
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
    />
  );
};
