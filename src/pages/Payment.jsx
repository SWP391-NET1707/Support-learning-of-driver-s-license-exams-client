import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

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
      const accessToken = user.accessToken;

      const response = await axios.post(
        'https://drivingschoolapi20231005104822.azurewebsites.net/api/Transaction/deposit/vnpay',
        {
          amount,
          redirectUrl: 'http://localhost:3000/payment',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      console.log(amount, window.location.href);

      if (response.status === 200) {
        const { paymentUrl } = response.data;
        setPaymentUrl(paymentUrl);

        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      } else {
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
