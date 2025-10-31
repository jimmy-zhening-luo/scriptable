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
    0: 5,
    0.01: 4,
    0.1: 3,
    1: 2,
    2: 2,
  };

  Location[
    `setAccuracyTo${
      Accuracy[accuracy]
    }`
  ]();

  const location = await Location.current(),
  digits = Round[accuracy];

  return {
    latitude: location.latitude.toFixed(digits),
    longitude: location.longitude.toFixed(digits),
  };
}
