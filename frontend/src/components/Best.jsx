import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const Best = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => {
        return item.bestseller;
      });
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10">
      
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Necessitatibus, dolores mollitia! Dolor, ipsam voluptates error
          expedita, ex provident, quae laborum explicabo ab quis labore
          temporibus exetationem. Reprehenderit alias quisquam quae!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.length > 0 ? (
          bestseller.map((item, index) => {


            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={
                  item.image
                }
                price={item.price}
              />
              
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No Best Sellers Found
          </p>
        )}
      </div>
    </div>
  );
};

export default Best;
