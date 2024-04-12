// Context.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Store = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  // const [products, setProducts] = useState([]);
  // const [showAlert, setShowAlert] = useState(false);
  // const [tokenExists, setTokenExists] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getTokenFromLocalStorage = () => {
    setToken(localStorage.getItem("token"));
    return localStorage.getItem("token");
  };

  const getCart = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://localhost:5000/api/addcart", {
          headers,
        });
        setCart(response.data);
      }
    } catch (error) {
      console.log("No auth found");
    }
  };

  useEffect(() => {
    getTokenFromLocalStorage();
    if (token) {
      getCart();
    }
  }, [token]);

  // function generateToken() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     const newToken = Math.random().toString(36).substr(2);
  //     localStorage.setItem("token", newToken);
  //     return newToken;
  //   }
  //   return token;
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  //   setTokenExists(!!token);
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((response) => {
  //       if (response.status === 200 || response.status === 201) {
  //         setProducts(response.data);
  //         setShowAlert(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);

  return (
    <Store.Provider
      value={{
        // tokenExists,
        cart,
        setCart,
        token, 
        setToken,
        getCart,
        // products,
        // setProducts,
        // showAlert,
        // isLoggedIn,
        // setIsLoggedIn,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Context;
