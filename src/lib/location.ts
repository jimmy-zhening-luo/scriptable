enum Accuracy {
  Best,
  Kilometer,
  ThreeKilometers,
  TenMeters = 10e-2,
  HundredMeters = 10e-1,
}

export default async function (
  accuracy: Accuracy = 10e-1,
) {
  const Round = {
    0: 10e5,
    0.01: 10e4,
    0.1: 10e3,
    1: 10e2,
    2: 10e2,
  };

  Location[
    `setAccuracyTo${
      Accuracy[accuracy]
    }`
  ]();

  const location = await Location.current(),
  factor = Round[accuracy],
  digits = Round[accuracy];

  function round(
    accuracy: number,
    coordinate: number,
  ) {
    return Math.round(coordinate * accuracy)
  }

  return {
    latitude: Math.round(location.latitude * factor) / factor;
    
    .toFixed(digits),
    longitude: location.longitude.toFixed(digits),
  };
}
