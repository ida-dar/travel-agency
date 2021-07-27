import React from 'react';
import PropTypes from 'prop-types';
import settings from '../../../data/settings';
import pricing from '../../../data/pricing.json';
import { Row, Col } from 'react-flexbox-grid';

import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripId, tripName, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    tripName,
    countryCode,
  };

  //console.log(payload);

  if(options.name === '' && options.contact === ''){
    alert('Please enter your contact data');
    return;
  }

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({tripCost, options, setOrderOption, countryCode, tripName, tripId}) => {
  //console.log(`pricing:`, pricing, `options:`, options, tripCost);

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
        <OrderSummary tripCost={tripCost} options={options} />
      </Col>
      <Button onClick={() => sendOrder(options, tripCost, tripId, tripName, countryCode)}>Order now!</Button>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  countryCode: PropTypes.string,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
};

export default OrderForm;
