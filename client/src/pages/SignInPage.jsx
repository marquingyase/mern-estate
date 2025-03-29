import { SignIn } from "../components/auth/SignIn";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { start, success, failure } from "../redux/user/userSlice.js";

export const SignInPage = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(start());
    await axios
      .post("/api/auth/sign-in", formData)
      .then((response) => {
        toast.success(response.data.message);
        dispatch(success(response.data.user));
        navigate("/");
      })
      .catch((err) => {
        dispatch(failure());
        toast.error(err.response.data.message);
      });
  };
  return (
    <SignIn
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      Link={Link}
    />
  );
};
