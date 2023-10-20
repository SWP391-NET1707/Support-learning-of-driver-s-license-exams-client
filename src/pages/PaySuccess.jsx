import React from 'react';
import styles from '../style/paysuccess.module.css';



const PaySuccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.circle}>
          <i className={styles.checkmark}>✓</i>
        </div>
        <h1 className={styles.heading}>Success</h1>
        <p className={styles.paragraph}>
          We received your purchase request;<br />we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
};

export default PaySuccess;
