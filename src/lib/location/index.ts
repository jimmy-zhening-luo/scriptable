import type { Accuracy } from "./types";

export default async function (
  accuracy: Accuracy = 1e-1,
) {
  const Accuracy = {
    0: "Best",
    1e-2: "TenMeters",
    1e-1: "HundredMeters",
    1: "Kilometer",
    3: "ThreeKilometers",
  } as const,
  Digits = {
    0: 5,
    1e-2: 4,
    1e-1: 3,
    1: 2,
    3: 2,
  };

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
