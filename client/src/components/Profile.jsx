import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { signInFailure, signInStart } from "../redux/user/userSlice";
import toast from "react-hot-toast";

export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [img, setImg] = useState(user.avatar);
  const { loading } = useSelector((state) => state.user);
  const avatarRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      async function handleSubmit() {
        dispatch(signInStart());
        const formData = new FormData();
        formData.append("file", file);
        await axios
          .put("/api/user/upload-image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            toast.success(response.data.message);
            setImg(response.data.avatar);
          })
          .catch((err) => {
            dispatch(signInFailure(err.response.data.message));
            toast.error(err.response.data.message);
          });
      }

      handleSubmit();
    }
  }, [dispatch, file]);

  return (
    <main className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center mt-7 text-3xl">Profile</h1>
      <p className="text-center mb-7">This is your profile page.</p>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={avatarRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={img || user.avatar}
          alt="Profile"
          onClick={() => avatarRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="cursor-pointer text-red-700">Delete Account</span>
        <span className="cursor-pointer text-red-700">Sign Out</span>
      </div>
    </main>
  );
};
