const Accuracy = {
  0: "Best",
  0.01: "TenMeters",
  0.1: "HundredMeters",
  1: "Kilometer",
  3: "ThreeKilometers",
} as const,
Digits = {
  0: 5,
  0.01: 4,
  0.1: 3,
  1: 2,
  3: 2,
};

export default async function (
  accuracy: Numbers<keyof typeof Accuracy> = 0.1,
) {
  Location[
    `setAccuracyTo${
      Accuracy[accuracy]
    }`
  ]();

  const location = await Location.current(),
  digits = Digits[accuracy];

  return {
    latitude: location.latitude.toFixed(digits),
    longitude: location.longitude.toFixed(digits),
  };
}
