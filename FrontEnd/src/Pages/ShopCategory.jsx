import React, { useContext } from "react";
import "./CSS/category.css";
import { ShopContext } from "../Context/ShopContext";
import dropdownicon from "../Component/Asset/dropdown_icon.png";
import Item from "../Component/Item/Item";

const ShopCategory = (props) => {
  const { all_product, toggleSortByPriceDescending } = useContext(ShopContext);

  const handleSortByPrice = () => {
    toggleSortByPriceDescending();
  };

  return (
    <div className="category">
      {/* <img className="category-banner" src={props.banner} alt="" /> */}
      <div className="sidebar">
        <div>
          <input onClick={handleSortByPrice} type="checkbox" name="" id=" " />
          <span>Theo giá từ cao đến thấp</span>
        </div>
        <div>
          <input type="checkbox" name="" id=" " />
          <span>Theo hãng A-Z</span>
        </div>
        <div>
          <input type="checkbox" name="" id=" " />
          <span>Theo hãng Z-A</span>
        </div>
        <input type="checkbox" name="" id=" " />
        <span>Theo chất liệu</span>
      </div>
      <div className="category-product">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              ></Item>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
