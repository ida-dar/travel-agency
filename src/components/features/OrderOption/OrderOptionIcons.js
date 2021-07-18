import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import { formatPrice } from '../../../utils/formatPrice';
import Icon from '../../common/Icon/Icon';

const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => {

  return(
    <div className={styles.component}>
      {required ? false : (
        <div
          className={styles.icon}
          value=''
          onClick={() => setOptionValue('')}
        >
          <Icon name={'times-circle'}/>
          none
        </div>
      )}

      {values.map(value => (
        <div
          className={currentValue === value.id ? styles.iconActive : styles.icon}
          key={value.id} value=''
          onClick={() => setOptionValue(value.id)}
        >
          <Icon name={value.icon} />
          {value.name} ({formatPrice(value.price)})
        </div>
      ))}
    </div>
  );
};

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;
