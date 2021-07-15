import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, addFilterTag, removeFilterTag, changeTripDurationFrom, changeTripDurationTo} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  addFilterTag: tag => dispatch(addFilterTag(tag)),
  removeFilterTag: tag => dispatch(removeFilterTag(tag)),
  changeTripDurationFrom: value => dispatch(changeTripDurationFrom(value)),
  changeTripDurationTo: value => dispatch(changeTripDurationTo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
