export default async function (
  accuracy:
    | 0
    | 0.01
    | 0.1
    | 1
    | 3 = 0.1,
) {
  const LocationAccuracy = {
    0: "Best",
    0.01: "TenMeters",
    0.1: "HundredMeters",
    1: "Kilometer",
    3: "ThreeKilometers",
  } as const,
  Round = {
    0: 5,
    0.01: 4,
    0.1: 3,
    1: 2,
    3: 2,
  };

  Location[
    `setAccuracyTo${
      LocationAccuracy[accuracy]
    }`
  ]();

  const {
    latitude,
    longitude,
  } = await Location.current(),
  digits = Round[accuracy];

  return {
    latitude: latitude.toFixed(digits),
    longitude: longitude.toFixed(digits),
  };
}
