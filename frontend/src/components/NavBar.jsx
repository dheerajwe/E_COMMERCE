import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,

    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const location = useLocation();
  return (
    <div className="flex items-center justify-between py-3 font-medium ">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36 " />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-900 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center justify-between gap-6 ">
        {location.pathname.includes("collection") && (
          <img
            src={assets.search_icon}
            slt="search icon"
            className="cursor-pointer w-5"
            onClick={() => setShowSearch(true)}
          />
        )}
        <div className="group relative">
          {/* <Link to={"/login"}> */}
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile-icon"
            onClick={() => (token ? null : navigate("/login"))}
          />
          {/* </Link> */}
          {/* dropdown */}
          {token && (
            <div className="group-hover:block hidden absolute w-28 right-0 ">
              <div className="flex flex-col gap-2 py-3 px-3 w-[100%] h-[100%] bg-slate-100 text-sm text-gray-700 rounded-md mt-1">
                <p className="cursor-pointer hover:text-black ">My Profile</p>
                <Link to={"/orders"}>
                  <p
                    className="cursor-pointer hover:text-black "
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                </Link>
                <p className="cursor-pointer hover:text-black" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart icon" className="w-5 min-w-5" />
          <p
            className={`absolute right-[-5px] bottom-[-5px] aspect-square w-4 text-center leading-4 text-white  rounded-full text-[8px] bg-black ${
              getCartCount() > 0 ? null : "hidden"
            }`}
          >
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu-icon"
          className="w-5 cursor-pointer sm:hidden "
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-[100%]" : "w-0"
        }`}
      >
        <div className="flex flex-col bg-white text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown icon"
              className="h-4 rotate-180"
            />
            <p className=" text-black">Back</p>
          </div>
          <NavLink
            to="/"
            className="py-2 pl-6"
            onClick={() => setVisible(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className="py-2 pl-6"
            onClick={() => setVisible(false)}
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className="py-2 pl-6"
            onClick={() => setVisible(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="py-2 pl-6"
            onClick={() => setVisible(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
