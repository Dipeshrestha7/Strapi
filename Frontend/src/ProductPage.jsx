import { useEffect, useState } from "react";

function ProductPage({ slug = "blue-pant" }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1337/api/products?filters[slug][$contains]=${slug}&populate=*`)
      .then(res => res.json())
      .then(data => setProduct(data.data[0] || null))
      .catch(err => console.error(err));
  }, [slug]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-bold">
        Product not found!
      </div>
    );
  }

  const imageUrl = product.Image?.url
    ? `http://localhost:1337${product.Image.url}`
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8">
        <img
          src={imageUrl}
          alt={product.Name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
            <p className="text-gray-600 mb-4">{product.Description}</p>
            <p className="text-blue-600 font-bold text-2xl mb-4">Rs. {product.Price}</p>
            <p className="text-yellow-500 font-semibold text-lg mb-4">⭐ {product.Rating}</p>
          </div>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full md:w-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
