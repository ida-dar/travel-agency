import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './TripSummary.scss';
import {Col} from 'react-flexbox-grid';

import { promoPrice } from '../../../utils/promoPrice';
import { getCountdownTime } from '../../../utils/getCountdownTime';

const TripSummary = ({id, image, name, cost, days, tags}) => {
  //console.log(id, image, name, cost, days, tags);

  const countDown = getCountdownTime();

  return(
    <Col xs={12} sm={6} lg={4} className={styles.column}>
      <Link to={`/trip/${id}`} className={styles.link}>
        <article className={styles.component}>
          <img src={image} alt={name} />
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.details}>
            <span>{days} days</span>
            {(countDown > 23 * 60 * 60) ?
              <React.Fragment>
                <span className={styles.happyHour}>
                  Price from {promoPrice(cost, 20)}
                </span>
                <span>Standard price from {cost}</span>
              </React.Fragment> :
              <span>from {cost}</span>
            }
          </div>
          {tags && (
            <div className={styles.tags}>
              {tags.map(tag => (
                <span className={styles.tag} key={tag.toString()}>{tag}</span>
              ))}
            </div>
          )}
        </article>
      </Link>
    </Col>

  );
};

TripSummary.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  name: PropTypes.string,
  intro: PropTypes.string,
  cost: PropTypes.string,
  days: PropTypes.number,
  tags: PropTypes.array,
};

export default TripSummary;
