/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;
  //console.log(trips);

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // filter by duration
  if(filters.duration) {
    output = output.filter(trip =>  trip.days <= filters.duration.to &&trip.days >= filters.duration.from);
  }

  // filter by tags
  if(filters.tags.length > -1){
    for (let tag of filters.tags){
      output = output.filter(trip => trip.tags.indexOf(tag) > -1);
      //console.log(output);
    }
  }

  // sort by cost descending (most expensive goes first)
  output.sort((a, b) => parseInt(b.cost.slice(1)) - parseInt(a.cost.slice(1)));

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter(trip => new RegExp(tripId, 'i').test(trip.id));

  //console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter(trip => new RegExp(countryCode, 'i').test(trip.country.code));

  //console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
