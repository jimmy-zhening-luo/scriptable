import type { WeatherApiResponse } from "./interface/api";

export async function weather(
  url: string,
  headers: FieldTable,
  location: Field<"latitude" | "longitude">,
  latitude: string,
  longitude: string,
) {
  function parseWeather(weather: WeatherApiResponse) {
    const {
      relative_humidity: humidity,
      dew_point_temperature: dew,
    } = weather
      .properties
      .timeseries[0]
      .data
      .instant
      .details;

    return {
      humidity,
      dew,
    };
  }

  const weatherApi = new Api(
    url,
    {
      [location.latitude]: latitude,
      [location.longitude]: longitude,
    },
    headers,
  ),
  {
    humidity,
    dew,
  } = parseWeather(
    await weatherApi.request<WeatherApiResponse>(),
  );

  const enum Fahrenheit {
    Factor = 9 / 5,
    Offset = 32,
  }

  return {
    humidity: humidity.toFixed(0),
    dew: (
      dew * Fahrenheit.Factor + Fahrenheit.Offset
    ).toFixed(0),
  };
}
