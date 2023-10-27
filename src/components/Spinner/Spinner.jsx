import React from 'react';

import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <>
      <p className={styles.load}>Загрузка...</p>
      <div className={styles.ldsSpinner}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </>
  )
}

export default Spinner;
