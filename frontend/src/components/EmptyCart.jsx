import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex  flex-col gap-8 justify-center items-center w-full m-4 p-2">
      <h1 className="text-3xl  sm:text-md mt-2  text-gray-500 ">
        CART <span className="text-gray-700 font-semibold">is empty</span>
      </h1>
      <Link
        to="/collection"
        className="  bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer  "
      >
        Go to Collection
      </Link>
    </div>
  );
};

export default EmptyCart;
