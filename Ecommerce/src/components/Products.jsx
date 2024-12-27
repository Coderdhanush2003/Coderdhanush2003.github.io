import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // Import toast for notifications

const Products = () => {
  const {
    searchValue,
    setSearchValue,
    filteredProducts,
    setFilteredProducts,
    productList,
    category,
    setCategory,
    cartItems,
    setCartItems,
    Favourites,
    setFavourites,
    uniqueId,
    userLogged,
  } = useContext(UserContext);

  const [temporaryQuantities, setTemporaryQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchValue, setFilteredProducts]);

  const handleQuantityChange = (productId, action) => {
    setTemporaryQuantities((prev) => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity =
        action === "increment"
          ? currentQuantity + 1
          : currentQuantity - 1 > 0
          ? currentQuantity - 1
          : 1;
      return { ...prev, [productId]: newQuantity };
    });
  };

  const cartPush = (product) => {
    if (!userLogged) {
      toast.error("Please login to add items to cart", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login");
      return;
    }

    const quantity = temporaryQuantities[product.id] || 1;
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    setTemporaryQuantities((prev) => ({ ...prev, [product.id]: undefined }));
  };

  async function postCartItems() {
    try {
      const response = await fetch("https://ecommerce-fullstack-r9n1.onrender.com/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uniqueId, cartItems }),
      });

      const data = await response.json();
      if (data.message === "Added to cart") {
        console.log("Cart updated successfully");
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } else {
        console.error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error while posting cart items:", error);
    }
  }

  async function getCartItems() {
    const response = await fetch(`http://localhost:2500/getcart/${uniqueId}`);
    const data = await response.json();
    setCartItems(data);
  }

  async function getFavourites() {
    try {
      const response = await fetch(`http://localhost:2500/getfavourite/${uniqueId}`);
      const data = await response.json();
      setFavourites(data);
      localStorage.setItem("Favourites", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  }

  async function postFavorites() {
    try {
      const response = await fetch("http://localhost:2500/addtofavourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uniqueId, Favourites }),
      });

      const data = await response.json();
      if (data.message === "Added to favourites") {
        console.log("Favourites updated successfully");
        localStorage.setItem("Favourites", JSON.stringify(Favourites));
      } else {
        console.error("Failed to update Favourites");
      }
    } catch (error) {
      console.error("Error while posting Favourites:", error);
    }
  }

  useEffect(() => {
    if (userLogged && uniqueId) {
      getCartItems();
      getFavourites();
    }
  }, [userLogged, uniqueId]);

  useEffect(() => {
    postCartItems();
  }, [cartItems]);

  useEffect(() => {
    postFavorites();
  }, [Favourites]);

  function addFavourites(id) {
    const productToAdd = productList.find((product) => product.id === id);
    const isAlreadyFavorite = Favourites.some((item) => item.id === id);

    if (!isAlreadyFavorite) {
      const newFavourites = [...Favourites, productToAdd];
      setFavourites(newFavourites);
      localStorage.setItem("Favourites", JSON.stringify(newFavourites));
    }
  }

  return (
    <div className="md:grid grid-cols-12 mt-4 z-12 h-auto flex flex-col">
      {/* Left Container */}
      <div className="min-w-54 left_container col-span-4 flex flex-col items-center z-1 bg-white sticky top-0">
        <h1 className="mt-2 font-bold text-[34px] md:text-[54px] text-center mb-4">
          Our <br />
          Products
        </h1>
        <ul className="text-center p-2 grid grid-cols-2 gap-2 md:grid-cols-none w-1/2">
          <li
            className={`py-2 rounded-full border border-gray-600 font-semibold mb-2 cursor-pointer hover:bg-gray-10 ${category === "all" && "bg-gray-100"}`}
            onClick={() => {
              setFilteredProducts(productList);
              setSearchValue("");
              setCategory("all");
            }}
          >
            All
          </li>
          <li
            className={`py-2 rounded-full border border-gray-600 font-semibold mb-2 cursor-pointer hover:bg-gray-10 ${category === "men" && "bg-gray-100"}`}
            onClick={() => {
              setFilteredProducts(productList.filter((product) => product.category === "men"));
              setSearchValue("");
              setCategory("men");
            }}
          >
            Mens
          </li>
          <li
            className={`py-2 rounded-full border border-gray-600 font-semibold mb-2 cursor-pointer hover:bg-gray-10 ${category === "women" && "bg-gray-100"}`}
            onClick={() => {
              setFilteredProducts(productList.filter((product) => product.category === "women"));
              setSearchValue("");
              setCategory("women");
            }}
          >
            Womens
          </li>
          <li
            className={`py-2 rounded-full border border-gray-600 font-semibold mb-2 cursor-pointer hover:bg-gray-10 ${category === "kids" && "bg-gray-100"}`}
            onClick={() => {
              setFilteredProducts(productList.filter((product) => product.category === "kids"));
              setSearchValue("");
              setCategory("kids");
            }}
          >
            Kids
          </li>
        </ul>
      </div>

      {/* Right Container - Product List */}
      <div className="col-span-8 flex flex-col flex-grow bg-white overflow-auto p-4 scrollbar-hide">
        <div className="flex flex-wrap gap-6 justify-center items-start lg:justify-start">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="w-34 bg-white rounded-2xl overflow-hidden items-start">
                <div className="relative">
                  <img src={product.img} alt="Product" className="w-full h-44 object-cover" />
                  <div className="absolute top-4 right-4">
                    <div className="text-red-500 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer" onClick={() => addFavourites(product.id)}>
                      ♥
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <div className="flex justify-between items-center px-4 py-2 rounded-lg">
                      <div className="flex gap-2 items-center">
                        <span className="px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200" onClick={() => handleQuantityChange(product.id, "decrement")}>
                          -
                        </span>
                        <span className="text-gray-600">{temporaryQuantities[product.id] || 1}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200" onClick={() => handleQuantityChange(product.id, "increment")}>
                          +
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">${product.price}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="w-full py-3 bg-black text-white text-lg rounded-md cursor-pointer hover:bg-gray-700" onClick={() => cartPush(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
