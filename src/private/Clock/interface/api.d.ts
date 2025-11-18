export interface IWeatherApiRequest {
  url: string;
  headers: FieldTable;
  query: FieldTable;
  location: Field<
    | "latitude"
    | "longitude"
  >;
}

export interface SunApiResponse {
  results: Field<
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
