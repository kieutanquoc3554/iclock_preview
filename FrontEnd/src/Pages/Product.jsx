import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Component/Breadcrums/Breadcrum";
import { ShopContext } from "../Context/ShopContext";
import ShowProduct from "../Component/ShowProduct/ShowProduct";
import Description from "../Component/Description/Description";
import RelatedProducts from "../Component/RelatedProduct/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product}></Breadcrum>
      <ShowProduct product={product}></ShowProduct>
      <Description></Description>
      <RelatedProducts></RelatedProducts>
    </div>
  );
};

export default Product;
