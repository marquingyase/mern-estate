export const Profile = ({
  Link,
  loading,
  user,
  avatarRef,
  setFile,
  handleChange,
  handleSubmit,
  handleSignout,
  handleUserDelete,
  handleListingDelete,
  handleListingUpdate,
  handleShowListing,
  listings,
}) => {
  return (
    <main className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center mt-7 text-3xl">Profile</h1>
      <p className="text-center mb-7">This is your profile page.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={avatarRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={user.avatar}
          alt="Profile"
          onClick={() => avatarRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          defaultValue={user.username}
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={user.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-80 cursor-pointer"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>
        <Link to="/create-listing">
          <button className="bg-green-700 w-full text-white p-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-80 cursor-pointer">
            Create Listing
          </button>
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="cursor-pointer text-red-700"
          onClick={handleUserDelete}
        >
          Delete Account
        </span>
        <span className="cursor-pointer text-red-700" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      <button onClick={handleShowListing} className="text-green-700 w-full">
        Show listings
      </button>
      {listings && listings?.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-center my-7">
            Your listings
          </h1>
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.images[0]}
                  alt="Listing cover"
                  className="w-16 h-16 object-contain"
                />
              </Link>
              <Link
                className="flex-1 font-semibold text-slate-700 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <h2>{listing.name}</h2>
              </Link>
              <div className="flex flex-col">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleListingUpdate(listing._id)}
                  className="text-green-700 uppercase cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </main>
  );
};
