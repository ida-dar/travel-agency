import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';

import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

const addDays = (date, days) => {
  const dateParts = date.split('/');
  // will return the date in dd/mm/yyyy format; '+' sets the type to number
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0: January - 0, February - 1, etc.
  const result = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  //console.log(result.toDateString());

  const newDate = result.setDate(result.getDate() + days);
  const dateFormat = new Intl.DateTimeFormat('en-UK').format(newDate);

  return dateFormat;
};

const OrderSummary = ({tripCost, options, days}) => {
  const tripStartDay = options['start-date'];
  //console.log(tripCost, options, days, typeof(days), tripStartDay, typeof(tripStartDay));
  //console.log(addDays(tripStartDay, days));

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
