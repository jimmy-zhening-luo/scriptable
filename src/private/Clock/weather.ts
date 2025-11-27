import Api from "../../lib/api";
import type { WeatherApiResponse } from "./interface/api";

export default async function weather(
  url: string,
  headers: FieldTable,
  location: Field<"latitude" | "longitude">,
  latitude: string,
  longitude: string,
) {
  const weatherApi = new Api(
    url,
    {
      [location.latitude]: latitude,
      [location.longitude]: longitude,
    },
    headers,
  ),
  {
    relative_humidity: humidity,
    dew_point_temperature: dew,
  } = (
    await weatherApi.request<WeatherApiResponse>()
  )
    .properties
    .timeseries[0]
    .data
    .instant
    .details;

  const enum Fahrenheit {
    Factor = 9 / 5,
    Offset = 32,
  }

  return {
    humidity: humidity.toFixed(0),
    dew: (
      dew * Fahrenheit.Factor + Fahrenheit.Offset
    )
      .toFixed(0),
  };
}
