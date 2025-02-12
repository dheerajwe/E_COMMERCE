import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/cartTotal";
import EmptyCart from "../components/EmptyCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <>
      {token ? (
        cartData.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="border-t pt-14 ">
            <div className="text-2xl mb-3">
              <Title text1={"Your"} text2={"Cart"} />
            </div>
            <div>
              {cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );
                return (
                  <div
                    key={index}
                    className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                  >
                    <div className="flex items-start gap-6">
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={productData.image[0]}
                          alt="product image"
                          className="w-16 sm:w-20"
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/product/${item._id}`}
                          className="text-xs sm:text-lg font-medium"
                        >
                          {productData.name}
                        </Link>

                        <div className="flex items-center gap-5 mt-2">
                          <p>
                            {currency}
                            {productData.price}
                          </p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      onChange={(event) =>
                        event.target.value === "" || event.target.value === 0
                          ? null
                          : updateQuantity(
                              item._id,
                              item.size,
                              Number(event.target.value)
                            )
                      }
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="border max-w-10 sm:max-2-20 px-1 sm:px-2 py-1"
                    />
                    <img
                      src={assets.bin_icon}
                      alt="remove icon"
                      className="w-4 mr-4 sm:w-5 cursor-pointer"
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end my-20">
              <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                  <button
                    className="bg-black text-white text-sm my-8 px-8 py-3"
                    onClick={() => navigate("/placeorder")}
                  >
                    {" "}
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Cart;
