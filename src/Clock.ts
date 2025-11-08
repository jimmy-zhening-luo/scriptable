"orange clock";
import Widget from "./app/widget";
import * as ClockApi from "./private/Clock";
import type {
  ClockSetting as Setting,
  SunCache,
} from "./private/Clock/interface";

await new class Clock extends Widget<Setting> {
  protected async runtime() {
    const { setting } = this;

    void this.line(1 / 3);
    this.clock(
      setting.clock.cities[0].timezone,
      setting.clock.cities[0].label,
      setting.clock.font,
    );
    void this.line(1 / 3);
    this.clock(
      setting.clock.cities[1].timezone,
      setting.clock.cities[1].label,
      setting.clock.font,
    );
    void this.line(4 / 3);

    const complications: string[] = [];

    const now = new Clock.Time,
    sunCacheData = this.get("sun"),
    sunCache = sunCacheData === undefined
      ? null
      : JSON.parse(sunCacheData) as SunCache,
    sun = sunCache === null
      || now.epoch > sunCache.expiry
      || now.offset() !== sunCache.offset
      ? {
          sunrise: null,
          sunset: null,
        }
      : {
          sunrise: now.at(sunCache.sunrise),
          sunset: now.at(sunCache.sunset),
        },
    weather: {
      humidity: Null<string>;
      dew: Null<string>;
    } = {
      humidity: null,
      dew: null,
    };

    try {
      const {
        latitude,
        longitude,
      } = await Clock.location();

      try {
        const {
          humidity,
          dew,
        } = await ClockApi.weather(
          setting.weather.api.userAgent,
          setting.weather.api.url,
          latitude,
          longitude,
        );

        weather.humidity = humidity;
        weather.dew = dew;
      }
      catch (e) {
        console.error("Weather API: " + String(e));
        console.warn("Continuing...");
      }

      if (
        sun.sunrise === null
        || sun.sunset === null
      )
        try {
          const {
            sunrise,
            sunset,
          } = await ClockApi.sun(
            setting.sun.api.url,
            latitude,
            longitude,
            now,
          );

          this.set(
            {
              sunrise,
              sunset,
              expiry: now.tomorrow.epoch,
              offset: now.offset(),
            } satisfies SunCache,
            "sun",
          );

          sun.sunrise = sunrise;
          sun.sunset = sunset;
        }
        catch (e) {
          console.error("Sun API: " + String(e));
          console.warn("Continuing...");
        }
    }
    catch (e) {
      console.error("Failed to get current location: " + String(e));
      console.warn("Skipping weather...");
    }

    function printSun(
      time: InstanceType<typeof Clock.Time>,
      badge: string,
    ) {
      return badge + time.time({ ampm: "\u2009" });
    }

    const {
      sunrise,
      sunset,
    } = sun;

    if (sunrise === null) {
      if (sunset !== null)
        void complications.push(
          printSun(sunset, "\u263E"),
        );
    }
    else
      if (sunset === null)
        void complications.push(
          printSun(sunrise, "\u235C "),
        );
      else
        void complications.push(
          now < sunrise.in(3)
            || now > sunset.in(2)
            ? printSun(sunrise, "\u235C ")
            : printSun(sunset, "\u263E"),
        );

    if (weather.humidity === null) {
      if (weather.dew !== null)
        void complications.push(`${weather.dew}\u00B0`);
    }
    else
      void complications.push(
        `\u224B\u2006${weather.humidity}%`
        + (
          weather.dew === null
            ? ""
            : ` ${weather.dew}\u00B0`
        ),
      );

    if (complications.length !== 0)
      void this.row(...complications);
  }
}(
  "readdle-spark://",
  new Widget.Time().print("E d"),
).run();
