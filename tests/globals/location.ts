const enum Accuracy {
  ThreeKilometers = 2,
  Kilometer,
  HundredMeters,
  TenMeters,
  Best,
}

const MOCK_LATLONG = {
  latitude: 82.3048478,
  longitude: -150.2048384,
};

interface GeocodeSummary {
  subAdministrativeArea: string | null;
  postalAddress: {
    country: string;
    postalCode: string;
    subAdministrativeArea: string;
    subLocality: string;
    state: string;
    street: string;
    city: string;
    isoCountryCode: string;
  };
  isoCountryCode: string | null;
  timeZone: string;
  location: {
    altitude: number;
    longitude: number;
    latitude: number;
  };
  country: string | null;
  subThoroughfare: string | null;
  thoroughfare: string | null;
  name: string;
  locality: string | null;
  areasOfInterest: string[] | null;
  ocean: string | null;
  subLocality: string | null;
  postalCode: string | null;
  administrativeArea: string | null;
  inlandWater: string | null;
}

/* eslint-disable ts/no-extraneous-class */
export class Location {
  private static accuracy = Accuracy.Best;

  public static async current() {
    const {
      latitude,
      longitude,
    } = MOCK_LATLONG,
    { accuracy } = Location;

    return Promise.resolve(
      {
        latitude: Number(latitude.toFixed(accuracy)),
        longitude: Number(longitude.toFixed(accuracy)),
        altitude: 100,
        verticalAccuracy: accuracy,
        horizontalAccuracy: accuracy,
      },
    );
  }

  public static async reverseGeocode(
    latitude: number,
    longitude: number,
    locale = "en-US",
  ): Promise<Array<GeocodeSummary>> {
    return Promise.resolve(
      [
        {
          subAdministrativeArea: "North Slope Borough",
          postalAddress: {
            country: "United States",
            postalCode: "99723",
            subAdministrativeArea: "North Slope Borough",
            subLocality: "Utqiaġvik",
            state: "Alaska",
            street: "123 Example St",
            city: "Utqiaġvik",
            isoCountryCode: "US",
          },
          isoCountryCode: "US",
          timeZone: "America/Anchorage",
          location: {
            altitude: 100,
            longitude,
            latitude,
          },
          country: "United States",
          subThoroughfare: "123",
          thoroughfare: "Example St",
          name: "Example Place",
          locality: "Utqiaġvik",
          areasOfInterest: ["Example Area " + locale],
          ocean: null,
          subLocality: "Utqiaġvik",
          postalCode: "99723",
          administrativeArea: "Alaska",
          inlandWater: null,
        },
      ],
    );
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
