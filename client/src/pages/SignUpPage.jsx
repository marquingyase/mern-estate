import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { SignUp } from "../components/auth/SignUp";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/auth/sign-up", formData)
      .then((response) => {
        toast.success(response.data.message);
        setLoading(false);
        navigate("/sign-in");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div>
      <SignUp
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        Link={Link}
      />
    </div>
  );
};
