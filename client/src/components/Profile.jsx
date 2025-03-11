export const Profile = ({ loading, user, avatarRef, setFile }) => {
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
          src={user.avatar}
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
