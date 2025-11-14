import type { WeatherApiResponse } from "./interface/api";

export async function weather(
  userAgent: string,
  url: string,
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

  const weatherApi = new Request(
    url
      .replaceAll(
        "%LAT",
        latitude,
      )
      .replaceAll(
        "%LONG",
        longitude,
      ),
  );

  weatherApi.headers = {
    "User-Agent": userAgent,
  };
  weatherApi.timeoutInterval = 10;

  const {
    humidity,
    dew,
  } = parseWeather(
    await weatherApi.loadJSON() as WeatherApiResponse,
  );

  const enum Fahrenheit {
    Factor = 9 / 5,
    Offset = 32,
  }

  return {
    humidity: humidity.toFixed(0),
    dew: (
      dew * Fahrenheit.Factor + Fahrenheit.Offset,
    ).toFixed(0),
  };
}
