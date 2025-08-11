export default async function location(
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
  } as const;

  if (accuracy !== 0)
    Location[
      `setAccuracyTo${LocationAccuracy[accuracy]}`
    ]();

  return Location.current();
};
