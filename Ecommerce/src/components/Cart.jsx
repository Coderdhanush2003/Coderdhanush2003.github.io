import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";


export const Cart = () => {
  const { cartVisible, setCartVisible, cartItems, setCartItems } =
    useContext(UserContext);

    const { error, isLoading, Razorpay } = useRazorpay();

  const handleQuantityChange = (itemId, action) => {
    // Find the item in the cart
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        // Update the quantity based on the action
        return {
          ...item,
          quantity:
            action === "increment"
              ? item.quantity + 1
              : item.quantity - 1 > 0
              ? item.quantity - 1
              : 1,
        };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: calculateTotalPrice().toFixed(2), // Amount in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: "order_9A33XWu170gUtm", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="fixed top-0 left-0 bg-white w-full sm:block max-w-[400px] h-screen z-10 p-6 rounded-lg sm:rounded-lg drop-shadow-lg overflow-auto">
      <p
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => {
          setCartVisible(!cartVisible);
        }}
      >
        &#x2715;
      </p>

      <h1 className="text-center font-bold text-3xl">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center font-semibold text-xl mt-4">
          Your cart is empty
        </p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 mt-4 rounded-lg flex items-center justify-between p-4 relative"
          >
            <p
              className="absolute top-0 left-[-4px] cursor-pointer"
              onClick={() => {
                // Filter the cart items to remove only the item with the specific id
                setCartItems(
                  cartItems.filter((cartItem) => cartItem.id !== item.id)
                );
              }}
            >
              &#x2715;
            </p>
            <div className="flex items-center">
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded" />
              <p className="ml-3 font-semibold">{item.name}</p>
            </div>

            <div className="flex justify-between items-center px-4 py-2 rounded-lg">
              <div className="flex gap-2 items-center">
                <span
                  onClick={() => handleQuantityChange(item.id, "decrement")}
                  className="px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                >
                  -
                </span>
                <span className="text-gray-600">{item.quantity}</span>
                <span
                  onClick={() => handleQuantityChange(item.id, "increment")}
                  className="px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                >
                  +
                </span>
              </div>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))
      )}

      <div className="mt-4 flex justify-between absolute bottom-12 text-xl right-0 bg-white w-full p-2">
        <p className="font-semibold">Total:</p>
        <p className="font-semibold">${calculateTotalPrice().toFixed(2)}</p>
      </div>

      <button className="absolute bottom-0 font-semibold bg-red-400 w-full right-0 h-12 rounded-lg text-white" onClick={handlePayment}>
        Place Order
      </button>
    </div>
  );
};
