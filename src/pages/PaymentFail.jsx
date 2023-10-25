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
        <h1 className={styles.heading}>Thanh Toán Thất Bại</h1>
        <p className={styles.paragraph}>
          Đã có vấn đề trong quá trình thanh toán.<br />Vui lòng thử lại sau.
        </p>
      </div>
    </div>
  );
};

export default PaymentFail;
