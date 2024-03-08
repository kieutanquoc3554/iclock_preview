import React, { useState } from "react";
import "./AddPromote.css";

const AddPromote = () => {
  const [promote, setPromote] = useState({
    name: "",
    startDate: "",
    endDate: "",
    discount: "",
  });

  return (
    <div className="add-promote">
      <div className="addpromote-item-input">
        <p>Nội dung khuyến mãi</p>
        <input
          value={promote.name}
          onChange=""
          type="text"
          name="name"
          placeholder="Nhập vào đây"
        />
      </div>
      <div className="addpromote-date">
        <div className="addpromote-item-input">
          <p>Ngày bắt đầu</p>
          <input
            value={promote.startDate}
            onChange=""
            type="date"
            name="startdate"
            placeholder="Nhập vào đây"
          />
        </div>
        <div className="addproduct-item-input">
          <p>Ngày kết thúc</p>
          <input
            value={promote.endDate}
            onChange=""
            type="date"
            name="enddate"
            placeholder="Nhập vào đây"
          />
        </div>
      </div>
      <div className="addproduct-item-input">
        <p>Giá trị giảm giá</p>
        <input
          value={promote.discount}
          onChange=""
          type="number"
          name="discount"
          placeholder="Nhập vào đây"
        />
      </div>
      <button onClick="" className="addproduct-button">
        Thêm khuyến mãi
      </button>
    </div>
  );
};

export default AddPromote;
