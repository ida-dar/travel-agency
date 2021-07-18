import React from 'react';
import styles from './OrderOption.scss';

import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionNumbers from './OrderOptionNumbers';
import OrderOptionDate from './OrderOptionDate';
import OrderOptionText from './OrderOptionText';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumbers,
  date: OrderOptionDate,
  text: OrderOptionText,
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  //console.log(optionTypes[type], otherProps, id, type);

  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          setOptionValue={value => setOrderOption({[id]: value})}
          {...otherProps}
        />

      </div>
    );
  }
};

export default OrderOption;
