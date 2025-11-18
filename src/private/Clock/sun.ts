import type { SunApiResponse } from "./interface/api";
import type Time from "../../lib/time";
import Api from "../../lib/api";

export async function sun(
  url: string,
  query: FieldTable,
  location: Field<"latitude" | "longitude">,
  latitude: string,
  longitude: string,
  date: Time,
) {
  const sunApi = new Api(
    url,
    {
      ...query,
      [location.latitude]: latitude,
      [location.longitude]: longitude,
      date: date.print("y-MM-dd"),
    },
  );

  const {
    sunrise,
    sunset,
  } = (await sunApi.request<SunApiResponse>())
    .results;

  return {
    sunrise: date.at(sunrise),
    sunset: date.at(sunset),
  };
}
