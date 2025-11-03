const enum Accuracy {
  ThreeKilometers = 2,
  Kilometer,
  HundredMeters,
  TenMeters,
  Best,
};

const MOCK_LOCATION = {
  latitude: 82.3048478,
  longitude: -150.2048384,
};

export class Location {
  private static accuracy = Accuracy.Best;

  public static async current() {
    const {
      latitude,
      longitude,
    } = MOCK_LOCATION,
    { accuracy } = Location;

    return Promise.resolve(
      {
        latitude: Number(latitude.toFixed(accuracy)),
        longitude: Number(longitude.toFixed(accuracy)),
      },
    );
  }

  public static reverseGeocode() {
    return [
      {
        address: "123 Main St",
      },
    ];
  }

  public static setAccuracyToBest() {
    Location.accuracy = Accuracy.Best;
  }

  public static setAccuracyToHundredMeters() {
    Location.accuracy = Accuracy.HundredMeters;
  }

  public static setAccuracyToKilometer() {
    Location.accuracy = Accuracy.Kilometer;
  }

  public static setAccuracyToTenMeters() {
    Location.accuracy = Accuracy.TenMeters;
  }

  public static setAccuracyToThreeKilometers() {
    Location.accuracy = Accuracy.ThreeKilometers;
  }
}
