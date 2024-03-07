import React, { useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Asset/logo.png";
import cart_icon from "../Asset/cart_icon.png";
import { Link } from "react-router-dom";
import all_product from "../Asset/all_product";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Asset/dropdown_icon.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalItem } = useContext(ShopContext);
  const menuRef = useRef();

  const dropDown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const handleLoginCheck = () => {
    setMenu("");
  };

  return (
    <div>
      <div className="contact-nav">Hỗ trợ: iclockhotro@gmail.com</div>
      <div className="navbar">
        <div className="nav">
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <div
              className="nav-logo"
              onClick={() => {
                setMenu("shop");
              }}
            >
              <img src={logo} alt="" />
              <p>iClock</p>
            </div>
          </Link>
          <img
            className="nav-dropdown"
            onClick={dropDown_toggle}
            src={nav_dropdown}
            alt=""
          />
        </div>
        {/* <i
          className="nav-dropdown fa-solid fa-caret-down"
          onClick={dropDown_toggle}
        ></i> */}
        <ul ref={menuRef} className="nav-menu">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Trang chủ
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("mens");
            }}
          >
            <Link style={{ textDecoration: "none", color: "black" }} to="/mens">
              Phái Mạnh
            </Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/womens"
            >
              Phái Đẹp
            </Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
            }}
          >
            <Link style={{ textDecoration: "none", color: "black" }} to="/kids">
              Trẻ em
            </Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
            >
              Đăng xuất
            </button>
          ) : (
            <Link to="/login">
              <button onClick={handleLoginCheck}>Đăng nhập</button>
            </Link>
          )}
          <Link to="/cart">
            <img src={cart_icon} alt="" />
          </Link>
          <div className={"nav-cart-count"}>{getTotalItem()}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
