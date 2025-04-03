export const CreateListing = ({
  setFiles,
  handleImageSubmit,
  formDatas,
  loading,
  load,
  handleChange,
  handleSubmit,
}) => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-center my-7 text-3xl">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formDatas.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formDatas.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formDatas.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={formDatas.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formDatas.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formDatas.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formDatas.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formDatas.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                className="p-3 border rounded-lg"
                onChange={handleChange}
                value={formDatas.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                className="p-3 border rounded-lg"
                onChange={handleChange}
                value={formDatas.bathrooms}
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="price"
                min={1}
                max={10000000}
                className="p-3 border rounded-lg"
                onChange={handleChange}
                value={formDatas.price}
              />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                {formDatas.type === "rent" && (
                  <span className="text-xs">($ / Month)</span>
                )}
              </div>
            </div>
            {formDatas.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  min={1}
                  max={10000000}
                  className="p-3 border rounded-lg"
                  onChange={handleChange}
                  value={formDatas.discountedPrice}
                />
                <div className="flex flex-col items-center">
                  <span>Discounted Price</span>
                  {formDatas.type === "rent" && (
                    <span className="text-xs">($ / Month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border rounded w-full"
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={loading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-55"
            >
              {load ? "Uploading..." : "Upload"}
            </button>
          </div>

          {formDatas.images.length > 0 &&
            formDatas.images.map((img, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 gap-4 border "
              >
                <img
                  src={img}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button className="p-3 text-red-700 uppercase rounded-lg hover:opacity-60">
                  Delete
                </button>
              </div>
            ))}

          <button
            disabled={load || loading}
            className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};
