import React, { useEffect } from 'react';
import styles from '../style/paysuccess.module.css';
import { afterPaymentSuccess } from '../api/auth-services';

const PaySuccess = () => {

  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user.accessToken
  useEffect(() => {
    // Check if the current page is PaymentSuccess
    const currentPage = window.location.pathname;
    if (currentPage === '/paysuccess') {
      // Get the courseId from session storage
      const courseId = JSON.parse(sessionStorage.getItem("courseId"));

      // Call afterPaymentSuccess with the courseId
      if (courseId) {
        afterPaymentSuccess(courseId,accessToken);
        sessionStorage.removeItem("courseId");
      }
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.circle}>
          <i className={styles.checkmark}>✓</i>
        </div>
        <h1 className={styles.heading}>Thành Công</h1>
        <p className={styles.paragraph}>
          We received your purchase request;<br />we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
};

export default PaySuccess;
