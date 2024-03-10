import React, { useContext } from "react";
import "./ShowProduct.css";
import star_icon from "../Asset/star_icon.png";
import star_dull_icon from "../Asset/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ShowProduct = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="showProduct">
      <div className="showProduct-left">
        {/* <div className="showProduct-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div> */}
        <div className="showProduct-img">
          <img className="showProduct-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="showProduct-right">
        <h1>{product.name}</h1>
        <div className="showProduct-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="showProduct-right-prices">
          <div className="showProduct-right-price-old">{product.old_price}</div>
          <div className="showProduct-right-price_new">{product.new_price}</div>
        </div>
        <div className="showProduct-right-des">abc</div>
        <div className="showProduct-right-size">
          <h1>Chọn loại dây: </h1>
          <div className="showProduct-right-sizes">
            <div>Nhựa</div>
            <div>Da</div>
            <div>Thép</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          Thêm vào giỏ hàng
        </button>
        {/* <p className="showProduct-right-category">
          <span>Danh mục: </span>Women, T-Shirt, Crop Top
        </p>
        <p className="showProduct-right-category">
          <span>Tag: </span>Modern, Latest
        </p> */}
      </div>
    </div>
  );
};

export default ShowProduct;
