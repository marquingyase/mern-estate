import { useState } from "react";
import { Link } from "react-router";

export const ContactLandlord = ({ listing }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <p>
        Contact <span className="font-semibold">{listing.user.username}</span>{" "}
        for <span className="font-semibold">{listing.name.toLowerCase()}</span>
      </p>
      <textarea
        name="message"
        id="message"
        rows="3"
        value={message}
        onChange={handleChange}
        placeholder="Enter your message here..."
        className="w-full p-2 border rounded-lg"
      />
      <Link
        to={`mailto:${listing.user.email}?subject=Regarding ${listing.name}&body=${message}`}
        className="text-white bg-slate-700 text-center rounded-lg  uppercase hover:opacity-95 p-3 w-full"
      >
          Send message
      </Link>
    </div>
  );
};
