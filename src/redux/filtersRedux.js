/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const ADD_FILTER = createActionName('ADD_FILTER');
export const REMOVE_FILTER = createActionName('REMOVE_FILTER');
export const CHANGE_DURATION_FROM = createActionName('CHANGE_DURATION_FROM');
export const CHANGE_DURATION_TO = createActionName('CHANGE_DURATION_TO');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const addFilterTag = payload => ({ payload, type: ADD_FILTER });
export const removeFilterTag = payload => ({ payload, type: REMOVE_FILTER });
export const changeTripDurationFrom = payload => ({ payload, type: CHANGE_DURATION_FROM });
export const changeTripDurationTo = payload => ({ payload, type: CHANGE_DURATION_TO });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case ADD_FILTER:
      //console.log(`statePart`, statePart, `action.payload`, action.payload);
      return {
        ...statePart,
        tags: [...statePart.tags, action.payload],
      };
    case REMOVE_FILTER:
      return {
        ...statePart,
        tags: [...statePart.tags.filter(tag => tag !== action.payload)],
      };
    case CHANGE_DURATION_FROM:
      //console.log(statePart.duration);
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          from: action.payload,
        },
      };
    case CHANGE_DURATION_TO:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          to: action.payload,
        },
      };
    default:
      return statePart;
  }
}
