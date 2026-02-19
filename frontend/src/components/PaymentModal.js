import React from "react";
import "./PaymentModal.css";

function PaymentModal({ open, onClose, order, onPaid }) {
  if (!open || !order) return null;

  return (
    <div className="pay-backdrop" onClick={onClose}>
      <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pay-head">
          <h2>Complete Payment</h2>
          <button className="pay-x" onClick={onClose}>✖</button>
        </div>

        <p className="pay-sub">
          Paying for: <b>{order.productName}</b> (Qty: {order.quantity})
        </p>

        <div className="pay-grid">
          {/* Dummy QR */}
          <div className="qr-box">
            <div className="qr">
              <div className="qr-scan"></div>
              <p>Scan to Pay</p>
              <small>UPI QR (Demo)</small>
            </div>
          </div>

          {/* Options */}
          <div className="pay-options">
            <p className="pay-label">Choose a payment option</p>

            <div className="upi-row">
              <button className="upi-btn">UPI</button>
              <button className="upi-btn">PhonePe</button>
              <button className="upi-btn">GPay</button>
              <button className="upi-btn">Paytm</button>
            </div>

            <div className="pay-note">
              This is a demo payment screen. No real money is involved ✅
            </div>

            <button className="paid-btn" onClick={onPaid}>
              ✅ Payment Done
            </button>

            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
