import type { Timezone } from "../../lib/time/timezone";

interface IWeatherApi {
  api: {
    userAgent: string;
    url: string;
  };
}

export interface ClockSetting {
  clock: {
    font: string;
    cities: Tuple<{
      timezone: Timezone;
      label: string;
    }>;
  };
  sun: IWeatherApi;
  weather: IWeatherApi;
}
