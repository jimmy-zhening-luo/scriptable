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
