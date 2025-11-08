export interface IWeatherApiRequest {
  api: Field<
    | "userAgent"
    | "url"
  >;
}

export interface SunApiResponse {
  api: Field<
    | "sunrise"
    | "sunset"
  >;
}

export interface WeatherApiResponse {
  properties: {
    timeseries: [{
      data: {
        instant: {
          details: Scalar<
            | "relative_humidity"
            | "dew_point_temperature"
          >;
        };
      };
    }];
  };
}
