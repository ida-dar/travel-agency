import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';
import { formatTime } from '../../../utils/formatTime';
import { getCountdownTime } from '../../../utils/getCountdownTime';

class HappyHourAd extends React.Component {
  constructor(){
    super();

    /* run this.forceUpdate() every second */
    this.myInterval = setInterval(() => {
      this.forceUpdate();
    }, 1000);

  }

  componentWillUnmount(){
    clearInterval(this.myInterval);
  }

  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }

  render() {
    const {title, promoDescription} = this.props;
    const countDown = getCountdownTime();

    return(
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{(countDown > 23 * 60 * 60) ? promoDescription : formatTime(countDown)}</div>
      </div>
    );
  }

}

export default HappyHourAd;
