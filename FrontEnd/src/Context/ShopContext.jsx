import React, { createContext, useState } from "react";
import CartItem from "../Component/CartItems/CartItem";
import { useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [sortByPriceDescending, setSortByPriceDescending] = useState(false);
  const [sortByPriceClicked, setSortByPriceClicked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/allproduct")
      .then((res) => res.json())
      .then((data) => {
        setAll_Product(data);

        if (localStorage.getItem("auth-token")) {
          fetch("http://localhost:4000/getcart", {
            method: "POST",
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: "",
          })
            .then((res) => res.json())
            .then((data) => setCartItems(data));
        }
      });
  }, []);

  const toggleSortByPriceDescending = () => {
    setSortByPriceClicked(true);
    setSortByPriceDescending(!sortByPriceDescending);
  };

  const sortedProducts = setSortByPriceClicked
    ? all_product.slice().sort((a, b) => {
        if (sortByPriceDescending) {
          return (
            parseInt(b.new_price.replace(/[^\d]/g, "")) -
            parseInt(a.new_price.replace(/[^\d]/g, ""))
          );
        } else {
          return (
            parseInt(a.new_price.replace(/[^\d]/g, "")) -
            parseInt(b.new_price.replace(/[^\d]/g, ""))
          );
        }
      })
    : all_product;

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng");
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      if (localStorage.getItem("auth-token")) {
        fetch("http://localhost:4000/addToCart", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    }
    // alert("Đã thêm vào giỏ hàng thành công! ^^");
    // console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const getTotalCart = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInformation = all_product.find(
          (product) => product.id === Number(item)
        );
        let new_price = parseInt(
          itemInformation.new_price.replace(/[^\d]/g, "")
        );
        totalAmount = totalAmount + new_price * cartItems[item];
      }
    }
    let showtotalAmount = totalAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return showtotalAmount;
  };

  const getTotalItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem = totalItem + cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalItem,
    getTotalCart,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    all_product: sortedProducts,
    toggleSortByPriceDescending,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
