import type { Timezone } from "../../../../lib/time/timezone";
import type { IWeatherApiRequest } from "./api";

export type { SunCache } from "./cache";
export interface ClockSetting {
  clock: {
    font: string;
    cities: Tuple<{
      timezone: Timezone;
      label: string;
    }>;
  };
  sun: IWeatherApiRequest;
  weather: IWeatherApiRequest;
}
