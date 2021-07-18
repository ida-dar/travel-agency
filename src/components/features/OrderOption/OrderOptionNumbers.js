import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionNumbers = ({limits, price, currentValue, setOptionValue}) => {
  //console.log(limits.min, limits.max);

  return(
    <div className={styles.number}>
      <input
        className={styles.inputSmall}
        type='number'
        value={currentValue}
        min={limits.min}
        max={limits.max}
        onChange={event => setOptionValue(event.currentTarget.value)}
      >
      </input> fare: {formatPrice(price)}
    </div>
  );
};

OrderOptionNumbers.propTypes = {
  limits: PropTypes.object,
  price: PropTypes.string,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  setOptionValue: PropTypes.func,
};

export default OrderOptionNumbers;
