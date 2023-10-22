import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import { handlePaymentRequest } from '../api/auth-services';

const Payment = () => {
  const [amount, setAmount] = useState(10000000);
  const [paymentUrl, setPaymentUrl] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionStatus = searchParams.get('vnp_TransactionStatus');

  const navigate = useNavigate();

  const handleRedirect = () => {
    if (transactionStatus === '00') {
      navigate('/paysuccess');
    } else {
      navigate('/payfail');
    }
  };

  useEffect(() => {
    // Check if there are query parameters in the URL
    if (location.search) {
      handleRedirect();
    }
  }, [location.search, transactionStatus]);

  const handleDeposit = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    try {
      const user = JSON.parse(sessionStorage.getItem("user"));

      const accessToken = user.accessToken;
  
      const paymentUrl = await handlePaymentRequest(accessToken, amount); // Use the function
  
      console.log(amount, window.location.href);
  
      if (paymentUrl) {
        setPaymentUrl(paymentUrl);
        window.location.href = paymentUrl;
      }
     else {
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

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
