import type { Accuracy } from "./types";

export default async function (
  accuracy: Accuracy = 1e-1,
) {
  const Accuracy = (
    {
      0: "Best",
      1e-2: "TenMeters",
      1e-1: "HundredMeters",
      1: "Kilometer",
      3: "ThreeKilometers",
    } as const
  )[accuracy],
  precision = {
    0: 5,
    1e-2: 4,
    1e-1: 3,
    1: 2,
    3: 2,
  }[accuracy];

  Location[`setAccuracyTo${Accuracy}`]();

  const {
    latitude,
    longitude,
  } = await Location.current();

  return {
    latitude: latitude.toFixed(precision),
    longitude: longitude.toFixed(precision),
  };
}
