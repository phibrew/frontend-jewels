import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(file => file instanceof File);

    if(images.length + selectedFiles.length > 5){
        return alert("You can only upload a maximum of 5 images.");
    }
    setImages(prev => [...prev, ...selectedFiles]);
    e.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || images.length === 0) {
      return alert("Please fill in all fields and upload at least one image.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    images.forEach((img) => formData.append("image", img));

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");
      alert("Product added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error: ", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, idx) => idx !==index));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
            />
            <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl resize-none h-24 focus:outline-none focus:ring focus:border-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
            />
            </div>
            <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
            />
            <label className="cursor-pointer inline-block bg-black text-white px-4 py-2 rounded hover:bg-opacity-80">
                Choose Images
                <input type="file" accept="image/*"
                    multiple className="hidden"
                    onChange={handleImageChange}
                />
            </label>

            {/* Image Preview */}
            {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
                {images.map((img, idx) => (
                <div key={idx} className="relative group">
                    <img
                    src={img instanceof File ? URL.createObjectURL(img) : ""}
                    alt={`preview-${idx}`}
                    className="h-24 w-24 object-cover rounded-md border"
                    />
                    <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                    &times;
                    </button>
                </div>
                ))}
            </div>
            )}

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300"
            >
            {loading ? "Adding..." : "Add Product"}
            </button>
        </form>
      </div>
    </div>
  );
}
