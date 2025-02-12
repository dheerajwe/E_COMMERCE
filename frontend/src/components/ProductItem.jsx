import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        {image && Array.isArray(image) && image.length > 0 ? (
          <img
            src={image[0]}
            className="hover:scale-110 transition ease-in-out"
            alt="product image"
          />
        ) : (
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
