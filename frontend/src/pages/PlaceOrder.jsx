import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import CartTotal from "../components/cartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    currency,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",

    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",

    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    console.log("Init")
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: currency,
      name: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      // console.log(orderData);
      switch (paymentMethod) {
        //cod
        case "COD":
          console.log("In cod");
          const response = await axios.post(
            backendUrl + "/place",
            orderData,
            { headers: { token } }
          );
          // console.log(response);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razor-pay":
          const responseRazorpay = await axios.post(
            backendUrl + "/razorpay",
            orderData,
            { headers: { token } }
          );
          console.log("response:",responseRazorpay);
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <input
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3 w-full outline-none "
          placeholder="Enter your first NAME:"
          onChange={onChangeHandler}
          name="firstName"
          value={formData.firstName}
          required
        />

        <input
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3 w-full outline-none"
          placeholder="Enter e-mail:"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3 w-full outline-none "
          placeholder="Street/Landmark"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3 w-full outline-none "
            placeholder="City/District"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3 w-full outline-none "
            placeholder="State"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>
        <input
          type="number"
          className="border border-gray-300 rounded py-1.5 px-3 w-full outline-none "
          placeholder="Pincode"
          onChange={onChangeHandler}
          name="zipcode"
          value={formData.zipcode}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            className="border w-1/5 border-gray-300 rounded py-1.5 px-3  outline-none "
            defaultValue={"+91"}
            placeholder="+91"
          />
          <input
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3 w-full outline-none "
            placeholder="Phone"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
          />
        </div>
      </div>
      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAY"} text2={"USING"} />
          {/* Payment methods */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setPaymentMethod("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "stripe" ? "bg-green-400" : ""
                }`}
              >
                {" "}
              </p>
              <img src={assets.stripe_logo} className="h-5 mx-4" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setPaymentMethod("razor-pay")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  paymentMethod === "razor-pay" ? "bg-green-400" : ""
                }`}
              >
                {" "}
              </p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setPaymentMethod("COD")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  paymentMethod === "COD" ? "bg-green-400" : ""
                }`}
              >
                {" "}
              </p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm "
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
