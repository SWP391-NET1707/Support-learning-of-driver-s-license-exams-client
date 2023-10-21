import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState(100000000); // Initial value, you can change it later
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handleDeposit = async () => {
    try {
      const response = await axios.post('https://drivingschoolapi20231005104822.azurewebsites.net/api/Transaction/deposit/vnpay', {
        amount,
        redirect: 'http://localhost:3000/payment',
      });

      if (response.status === 200) {
        const { paymentUrl } = response.data;
        setPaymentUrl(paymentUrl); // Set the paymentUrl in the component state

        // Automatically redirect to the paymentUrl
        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      } else {
        // Handle an error response here
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <div>Pay</div>
      <div>
        <p>Amount: {amount}</p>
        {paymentUrl ? (
          <p>Redirecting to payment page...</p>
        ) : (
          <button onClick={handleDeposit}>Make Payment</button>
        )}
      </div>
    </div>
  );
};

export default Payment;
