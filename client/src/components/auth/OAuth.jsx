import axios from "axios";
import { app } from "../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      axios
        .post("/api/auth/google", {
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        })
        .then((response) => {
          dispatch(signInSuccess(response.data.user));
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="cursor-pointer bg-red-700 text-white rounded-lg uppercase p-3 hover:opacity-85"
    >
      Continue with Google
    </button>
  );
};
