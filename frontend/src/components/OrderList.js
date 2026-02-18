import React from "react";

const OrderList = ({ orders, onPay }) => {
  return (
    <div>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{order.productName}</h3>
          <p>Quantity: {order.quantity}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>
          {!order.isPaid && <button onClick={() => onPay(order._id)}>Pay</button>}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
