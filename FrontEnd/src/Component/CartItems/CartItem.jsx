import React from "react";
import "./CartItem.css";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Asset/cart_cross_icon.png";

const CartItem = () => {
  const { getTotalCart, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cart_title">
        <h1>GIỎ HÀNG</h1>
      </div>
      <div className="cartitems-main">
        <p>Sản phẩm</p>
        <p>Tên</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng cộng</p>
        <p>Xoá khỏi giỏ hàng</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          let parseNewPrice = parseInt(e.new_price.replace(/[^\d]/g, ""));
          return (
            <div>
              <div className="cartitems-format cartitems-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className="cartItem-quantity">{cartItems[e.id]}</button>
                <p>
                  {(parseNewPrice * cartItems[e.id])
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  ₫
                </p>
                <img
                  className="cartItem-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItems-bottom">
        <div className="cartItems-total">
          <h1>Tổng tiền: </h1>
          <div>
            <div className="cartItem-total-item">
              <p>Tổng tiền sản phẩm:</p>
              <p>{getTotalCart()} ₫</p>
            </div>
            <hr />
            <div className="cartItem-total-item">
              <p>Phí vận chuyển:</p>
              <p>Miễn phí</p>
            </div>
            <hr />
            <div className="cartItem-total-item">
              <h3>Tổng cộng:</h3>
              <h3>{getTotalCart()} ₫</h3>
            </div>
            <button className="confirm_btn">XÁC NHẬN ĐƠN HÀNG</button>
          </div>
          <div className="cartItems-promocode">
            <p>Nếu bạn có mã khuyến mãi, vui lòng nhập tại đây:</p>
            <div className="cartItems-promoteContainer">
              <input type="text" placeholder="Mã khuyến mãi" />
              <button className="promote_code">Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
