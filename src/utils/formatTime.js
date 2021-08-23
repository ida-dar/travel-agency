export const formatTime = time => {

  if(time === undefined) {
    return null;
  } else if(isNaN(time)) {
    return null;
  } else if(time < 0){
    return null;
  } else if(!isNaN(time)){

    let secondsFormatted = Math.floor(time % 60);
    let minutesFormatted = Math.floor((time / 60) % 60);
    let hoursFormatted = Math.floor(time / 3600);

    let seconds = secondsFormatted.toString().padStart(2, '0');
    let minutes = minutesFormatted.toString().padStart(2, '0');
    let hours = hoursFormatted.toString().padStart(2, '0');

    return (`${hours}:${minutes}:${seconds}`);
  }

};
