import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { start, failure } from "../redux/user/userSlice";
import { useNavigate, useParams } from "react-router";
import { UpdateListing } from "../components/UpdateListing";

export const UpdateListingPage = () => {
  const [files, setFiles] = useState([]);
  const { loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [formDatas, setFormData] = useState({
    images: [],
    name: "",
    description: "",
    address: "",
    price: 0,
    discountedPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
  });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      await axios
        .get(`/api/listing/${params.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          setFormData(response.data.data);
        });
    };
    fetchListing();
  }, [params.id]);

  const handleImageSubmit = async () => {
    // e.preventDefault();
    if (files.length > 0 && files.length + formDatas.images.length < 7) {
      setLoad(true);
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
          setLoad(false);
          toast.success(response.data.message);
          setFormData({
            ...formDatas,
            images: formDatas.images.concat(response.data.data),
          });
        })
        .catch((err) => {
          setLoad(false);
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("You can only upload 6 images per listing");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formDatas.images.length < 1)
        return toast.error("You must upload at least one image");
      if (+formDatas.price < +formDatas.discountedPrice)
        return toast.error("Discount price must be lower than regular price");
      dispatch(start());
      await axios
        .put(
          `/api/listing/update/${params.id}`,
          {
            ...formDatas,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch(failure());
          toast.success(response.data.message);
        //   navigate(`/listing/${response.data.data._id}`);
        });
    } catch (err) {
      dispatch(failure());
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formDatas, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formDatas, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formDatas, [e.target.id]: e.target.value });
    }
  };

  return (
    <UpdateListing
      setFiles={setFiles}
      handleImageSubmit={handleImageSubmit}
      formDatas={formDatas}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      load={load}
    />
  );
};
