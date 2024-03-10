import React, { createContext, useState } from "react";
import CartItem from "../Component/CartItems/CartItem";
import { useEffect } from "react";
import moment from "moment";
import "moment-timezone";

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
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

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
  const applyPromo = async (promoCode) => {
    fetch("http://localhost:4000/checkpromocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promoCode }),
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        if (data.success) {
          if (
            data.currentDate >= data.startDate &&
            data.currentDate <= data.endDate
          ) {
            setPromoApplied(true);
            setDiscount(data.discount);
            alert(
              `Bạn được giảm: ${data.discount}%. Chúc quý khách trải nghiệm cảm giác mua sắm thật thú vị!`
            );
            // await fetch("http://localhost:4000/removepromote", {
            //   method: "POST",
            //   headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ promoCode }),
            // });
          } else {
            setPromoApplied(false);
            alert(
              `Mã đã hết hạn hoặc đã được sử dụng. Hẹn gặp bạn trong các lần khuyến mãi sau!`
            );
            setDiscount(0);
          }
        } else {
          setPromoApplied(false);
          alert(
            `Mã đã hết hạn hoặc đã được sử dụng. Hẹn gặp bạn trong các lần khuyến mãi sau!`
          );
          setDiscount(0);
        }
      });
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

  const getTotalCartPromote = () => {
    let totalCart = parseInt(getTotalCart().replace(/[^\d]/g, ""));
    let totalCartPromotion = totalCart;
    if (promoApplied) {
      let discountAmount = totalCart * (parseInt(discount) / 100);
      totalCartPromotion = totalCart - discountAmount;
    }
    let totalCartPromote = totalCartPromotion
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return totalCartPromote;
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
    promoApplied,
    applyPromo,
    getTotalCartPromote,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
