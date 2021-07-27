import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
//import { setOrderOption } from '../../../redux/orderRedux';

const OrderForm = ({tripCost, options, setOrderOption, days}) => {
  //console.log(`pricing:`, pricing, `options:`, options, tripCost, days);

  return (
    <Row>
      {pricing.map(option => (
        <Col md={4} key={option.id}>
          <OrderOption
            key={option.name}
            {...option}
            currentValue={options[option.id]}
            setOrderOption={setOrderOption}
          />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options} days={days} />
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  days: PropTypes.number,
};

export default OrderForm;
