import type Time from "../../lib/time";
import type { SunApiResponse } from "./interface/api"

export async function sun(
  url: string,
  latitude: string,
  longitude: string,
  date: Time,
) {
  const sunApi = new Request(
    url
      .replaceAll(
        "%LAT",
        latitude,
      )
      .replaceAll(
        "%LONG",
        longitude,
      )
      + date.print("'&date='y-MM-dd"),
  );

  sunApi.timeoutInterval = 10;

  const {
    sunrise,
    sunset,
  } = await sunApi.loadJSON() as SunApiResponse;

  return {
    sunrise: date.at(sunrise),
    sunset: date.at(sunset),
  };
}
