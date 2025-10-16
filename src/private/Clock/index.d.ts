import type { Timezone } from "../../lib/time/timezone";

interface IWeatherApi {
  api: {
    userAgent: string;
    url: string;
  };
}

export type ClockSetting = {
  clocks: Tuple<{
    timezone: Timezone;
    label: string;
  }>;
}
& Record<
  | "sun"
  | "weather",
  IWeatherApi
>;
