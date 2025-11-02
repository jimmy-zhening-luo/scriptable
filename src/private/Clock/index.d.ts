import type { Timezone } from "../../lib/time/timezone";
import type { IWeatherApi } from "./api";

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
