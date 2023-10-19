import React from 'react';
import '../style/paysuccess.module.css'; // Import your CSS file

const PaySuccess = () => {
  return (
    <div className="card">
      <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
        <i className="checkmark">✓</i>
      </div>
      <h1>Thanh toán thành công</h1>
  
    </div>
  );
};

export default PaySuccess;
