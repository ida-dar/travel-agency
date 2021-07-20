import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';

import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

const addDays = (date, days) => {
  // const dateParts = date.split('-');
  // const result = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  const result = new Date();
  result.setDate(result.getDate() + days);
  const dateFormat = new Intl.DateTimeFormat('en-UK').format(result);
  return dateFormat;
};

const OrderSummary = ({tripCost, options, days}) => {
  const tripStartDay = options['start-date'];
  //console.log(tripCost, options, days, typeof(days), tripStartDay, typeof(tripStartDay));

  return (
    <div>
      <h3 className={styles.component}>Trip duration: {tripStartDay} {tripStartDay ? ` - ` + addDays(tripStartDay, days) : ''} ({days} days)</h3>
      <h2 className={styles.component}>Total: <strong> {formatPrice(calculateTotal(tripCost, options))} </strong></h2>
    </div>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  days: PropTypes.number,
};

export default OrderSummary;
