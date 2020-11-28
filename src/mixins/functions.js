const KalvinToCelsius = (K) => {
  return Math.round((K - 273.5) * 10) / 10;
};

const UnixTimeToHour = (UnixTime) => {
  const date = new Date(UnixTime * 1000);
  const hour = date.getHours();
  const min = "0" + date.getMinutes();
  return hour + "h" + min.substr(-2);
};

export { KalvinToCelsius, UnixTimeToHour };
