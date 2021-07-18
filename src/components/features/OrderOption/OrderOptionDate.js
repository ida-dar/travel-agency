import React, { useState } from 'react';
import styles from './OrderOption.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = () => {
  const [startDate, setStartDate] = useState(new Date());

  return(
    <div className={styles.component}>
      <DatePicker
        className={styles.input}
        placeholderText="Click to select a date"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        todayButton="Today"
        isClearable={true}
      />
    </div>
  );
};

export default OrderOptionDate;
