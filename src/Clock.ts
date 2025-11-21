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

    const enum Break {
      Line = 1 / 3,
      Section = Line * 4,
    }

    void this.line(Break.Line);
    this.clock(
      setting.clock.cities[0].timezone,
      setting.clock.cities[0].label,
      setting.clock.font,
    );
    void this.line(Break.Line);
    this.clock(
      setting.clock.cities[1].timezone,
      setting.clock.cities[1].label,
      setting.clock.font,
    );
    void this.line(Break.Section);

    const complications: string[] = [],

    now = new Clock.Time,
    sunCacheData = this.get("sun"),
    sunCache = sunCacheData && JSON.parse(sunCacheData),
    sun: Record<"sunrise" | "sunset", Null<InstanceType<typeof Clock.Time>>> = !sunCache
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
    weather: Record<"humidity" | "dew", Null<string>> = {
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
          setting.weather.url,
          setting.weather.headers,
          setting.weather.location,
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

      if (!sun.sunrise || !sun.sunset)
        try {
          const {
            sunrise,
            sunset,
          } = await ClockApi.sun(
            setting.sun.url,
            setting.sun.query,
            setting.sun.location,
            latitude,
            longitude,
            now,
          );

          this.set(
            {
              sunrise: sunrise.print("h:mm a"),
              sunset: sunset.print("h:mm a"),
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

    const enum Space {
      None = "",
      Thin = "\u2009",
      Sixth = "\u2006",
      Full = " ",
    }

    const {
      sunrise,
      sunset,
    } = sun;

    const enum Day {
      Sunset = 2,
      Sunrise,
    }

    const enum SunIcon {
      Sunset = "\u263E" + Space.Thin,
      Sunrise = "\u235C" + Space.Full,
    }

    function printSun(
      time: InstanceType<typeof Clock.Time>,
      badge: string,
    ) {
      return badge + time.time(
        { ampm: Space.Thin as string },
      );
    }

    if (sunrise)
      if (sunset)
        void complications.push(
          now > sunrise.in(Day.Sunrise)
          && now < sunset.in(Day.Sunset)
            ? printSun(sunset, SunIcon.Sunset)
            : printSun(sunrise, SunIcon.Sunrise),
        );
      else
        void complications.push(
          printSun(sunrise, SunIcon.Sunrise),
        );
    else if (sunset)
      void complications.push(
        printSun(sunset, SunIcon.Sunset),
      );

    const enum WeatherIcon {
      Header = "\u224B" + Space.Sixth,
      Dew = "\u00B0",
      Humidity = "%",
    }

    if (weather.humidity || weather.dew)
      void complications.push(
        WeatherIcon.Header
        + (
          weather.humidity
            ? weather.humidity
              + WeatherIcon.Humidity
              + (
                weather.dew
                  ? Space.Full
                    + weather.dew
                    + WeatherIcon.Dew
                  : Space.None
              )
            : weather.dew!
              + WeatherIcon.Dew
        ),
      );

    if (complications.length !== 0)
      void this.row(...complications);
  }
}(
  "readdle-spark://",
  new Widget.Time().print("E d"),
).run();
