const KalvinToCelsius = (K) => {
  return Math.round((K - 273.5) * 10) / 10;
};

export { KalvinToCelsius };
