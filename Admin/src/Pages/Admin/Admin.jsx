// import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import Customer from "../../components/Customer/Customer";
import Promotion from "../../components/Promotion/Promotion";
import AddPromote from "../../components/AddPromote/AddPromote";
import Introduction from "../../components/Introduction/Introduction";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Introduction />}></Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/addpromote" element={<AddPromote />}></Route>
        <Route path="/listproduct" element={<ListProduct />}></Route>
        <Route path="/customermanager" element={<Customer />}></Route>
        <Route path="/promotionmanager" element={<Promotion />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
