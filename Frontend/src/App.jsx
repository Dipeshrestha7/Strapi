import { useEffect, useState } from "react";
import ProductPage from "./ProductPage";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:1337/api/products?populate=*")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">🛍 Our Products</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {products.map((product) => {
          const imageUrl = product.Image?.url
            ? `http://localhost:1337${product.Image.url}`
            : "https://via.placeholder.com/300x300?text=No+Image";

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5"
            >
              {/* Image */}
              <img
                src={imageUrl}
                alt={product.Image?.name || product.Name}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />

              {/* Product Name */}
              <h2 className="text-lg font-semibold">{product.Name}</h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-1">
                {product.Description}
              </p>

              {/* Price */}
              <p className="text-blue-600 font-bold mt-2">
                Rs. {product.Price}
              </p>

              {/* Rating + Button */}
              <div className="mt-3 flex justify-between items-center">
                <span className="text-yellow-500 font-medium">
                  ⭐ {product.Rating}
                </span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
    <ProductPage />
    </>
  );
}

export default App;
