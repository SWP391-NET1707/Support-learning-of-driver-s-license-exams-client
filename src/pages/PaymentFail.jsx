import React from 'react';
import styles from '../style/paymentfail.module.css';

const PaymentFail = () => {
  const currentPage = window.location.pathname;
  if (currentPage === '/payfail') {
    sessionStorage.removeItem("courseId");
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.circle}>
          <i className={styles.error}>✘</i>
        </div>
        <h1 className={styles.heading}>Payment Failed</h1>
        <p className={styles.paragraph}>
          Sorry, your payment could not be processed.<br />Please try again later.
        </p>
      </div>
    </div>
  );
};

export default PaymentFail;
