import React from 'react';
//import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = () => {

  return(
    <div className={styles.component}>
      <input
        className={styles.input}
        type='text'
      />
    </div>
  );
};


export default OrderOptionText;
