const KalvinToCelsius = (K) => {
  return Math.round((K - 273.5) * 10) / 10;
};

const UnixTimeToHour = (UnixTime) => {
  const date = new Date(UnixTime * 1000);
  const hour = "0" + date.getHours();
  const min = "0" + date.getMinutes();
  return hour.substr(-2) + "h" + min.substr(-2);
};

const UnixTimeToDate = (UnixTime) => {
  const date = new Date(UnixTime * 1000);
  const day = "0" + date.getDate();
  const month = "0" + (date.getMonth() + 1);
  return day.substr(-2) + "/" + month.substr(-2);
};

const UnixTimeToDay = (UnixTime) => {
  const date = new Date(UnixTime * 1000);
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return days[date.getDay()];
};

export { KalvinToCelsius, UnixTimeToHour, UnixTimeToDate, UnixTimeToDay };
