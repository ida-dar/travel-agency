export const getCountdownTime = () => {
  const currentTime = new Date();
  const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0)); // year, monthIndex, day, hours, minutes, seconds, milliseconds

  if(currentTime.getUTCHours() >= 12){
    nextNoon.setUTCDate(currentTime.getUTCDate() + 1);
  }

  return Math.round((nextNoon.getTime() - currentTime.getTime()) / 1000);
};
