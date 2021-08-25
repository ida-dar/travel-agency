import React from 'react';
import { getCountdownTime } from '../../../utils/getCountdownTime';

class PhoneNumbers extends React.Component {

  render(){
    return(
      <span>
        {this.changePhoneNumbers()}
      </span>
    );
  }

  changePhoneNumbers(){
    const countDown = getCountdownTime();

    if(countDown > 0 && countDown <= 4 * 60 * 60){
      return 'Amanda, 678.243.8455'; // 8:00 - 11:59:59
    } else if ( countDown > 20 * 60 * 60 && countDown <= 24 * 60 * 60){
      return 'Tobias, 278.443.6443'; // 12:00 - 15:59:59
    } else if (countDown > 14 * 60 * 60 && countDown <= 20 * 60 * 60){
      return 'Helena, 167.280.3970'; // 16:00 - 21:59:59
    } else {
      return 'The office opens at 8:00 UTC';
    }
  }

}

export default PhoneNumbers;
