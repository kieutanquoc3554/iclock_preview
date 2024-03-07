// import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import Customer from "../../components/Customer/Customer";
import Promotion from "../../components/Promotion/Promotion";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/listproduct" element={<ListProduct />}></Route>
        <Route path="/customermanager" element={<Customer />}></Route>
        <Route path="/promotionmanager" element={<Promotion />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
