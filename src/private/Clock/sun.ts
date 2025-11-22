import Api from "../../lib/api";
import type Time from "../../lib/time";
import type { SunApiResponse } from "./interface/api";

export async function sun(
  url: string,
  query: FieldTable,
  location: Field<"latitude" | "longitude">,
  latitude: string,
  longitude: string,
  date: Time,
) {
  query[location.latitude] = latitude;
  query[location.longitude] = longitude;
  query["date"] = date.print("y-MM-dd");

  const sunApi = new Api(url, query),
  {
    sunrise,
    sunset,
  } = (await sunApi.request<SunApiResponse>())
    .results;

  return {
    sunrise: date.at(sunrise),
    sunset: date.at(sunset),
  };
}
