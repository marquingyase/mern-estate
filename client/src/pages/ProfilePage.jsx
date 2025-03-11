import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { signInStart, signInSuccess } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { Profile } from "../components/Profile";

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
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
          .put(`/api/user/update-user/${user.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            toast.success(response.data.message);
            dispatch(signInSuccess(response.data.user));
          })
          .catch((err) => {
            // dispatch(signInFailure(err.response.data.message))
            toast.error(err.response.data.message);
          });
      }

      handleSubmit();
    }
  }, [dispatch, file, user.id]);
  return (
    <Profile
      loading={loading}
      avatarRef={avatarRef}
      setFile={setFile}
      user={user}
    />
  );
};
