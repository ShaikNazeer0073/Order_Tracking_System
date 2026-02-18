import React, { useState } from "react";

const OrderForm = ({ onCreate }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ productName, quantity });
    setProductName("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">Create Order</button>
    </form>
  );
};

export default OrderForm;
