"orange clock";
import Widget from "./app/widget";
import type { ClockSetting } from "./private/Clock";

interface ISunCache {
  expiry: number;
  offset: number;
  sunrise: string;
  sunset: string;
}

await new class Clock extends Widget<ClockSetting> {
  protected async runtime() {
    const { setting } = this;

    void this.line(4);
    this.clock(
      setting.clock.cities[0].timezone,
      setting.clock.cities[0].label,
      setting.clock.font,
    );
    void this.line(4);
    this.clock(
      setting.clock.cities[1].timezone,
      setting.clock.cities[1].label,
      setting.clock.font,
    );
    void this.line(16);

    const {
      latitude,
      longitude,
    } = await Clock.location(),
    badges: string[] = [];

    try {
      const now = new Clock.Time,
      cacheData = this.get("sun"),
      cache = cacheData === undefined
        ? null
        : JSON.parse(cacheData) as ISunCache,
      {
        sunset,
        sunrise,
      } = cache === null
        || now as unknown as number > cache.expiry
        || now.offset() !== cache.offset
        ? await this.sun(
            setting.sun.api.url,
            latitude,
            longitude,
          )
        : {
            sunrise: now.at(cache.sunrise),
            sunset: now.at(cache.sunset),
          };

      function printSun(
        time: InstanceType<typeof Clock.Time>,
        badge: string,
      ) {
        return badge + time.time({ ampm: "\u2009" });
      }

      void badges.push(
        now > sunrise.in(3)
        && now < sunset.in(2)
          ? printSun(sunset, "\u263E")
          : printSun(sunrise, "\u235C "),
      );
    }
    catch (e) {
      console.error("Sun API: " + String(e));
      console.warn("Continuing...");
    }

    try {
      const {
        humidity,
        dew,
      } = await this.weather(
        setting.weather.api.userAgent,
        setting.weather.api.url,
        latitude,
        longitude,
      );

      void badges.push(`\u224B\u2006${humidity}% ${dew}\u00B0`);
    }
    catch (e) {
      console.error("Weather API: " + String(e));
      console.warn("Continuing...");
    }

    if (badges.length !== 0)
      void this.text(
        badges.join(
          " ".repeat(4),
        ),
      );
  }

  private async sun(
    url: string,
    latitude: string,
    longitude: string,
    date = new Clock.Time,
  ) {
    interface ISun {
      results: {
        sunrise: string;
        sunset: string;
      };
    }
    function parseSun(sun: ISun) {
      const {
        sunset,
        sunrise,
      } = sun.results;

      return {
        sunset,
        sunrise,
      };
    }

    const sunApi = new Request(
      url
        .replaceAll(
          "%LAT",
          latitude,
        )
        .replaceAll(
          "%LONG",
          longitude,
        )
        + date.print("'&date='y-MM-dd"),
    );

    sunApi.timeoutInterval = 10;

    const {
      sunrise,
      sunset,
    } = parseSun(
      await sunApi.loadJSON() as ISun,
    );

    this.set(
      {
        sunrise,
        sunset,
        expiry: date.tomorrow.epoch,
        offset: date.offset(),
      } satisfies ISunCache,
      "sun",
    );

    return {
      sunrise: date.at(sunrise),
      sunset: date.at(sunset),
    };
  }

  private async weather(
    userAgent: string,
    url: string,
    latitude: string,
    longitude: string,
  ) {
    interface IWeather {
      properties: {
        timeseries: Single<{
          data: {
            instant: {
              details: Scalar<
                | "relative_humidity"
                | "dew_point_temperature"
              >;
            };
          };
        }>;
      };
    }
    function parseWeather(weather: IWeather) {
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
      await weatherApi.loadJSON() as IWeather,
    );

    return {
      humidity: humidity.toFixed(0),
      dew: (dew * 9 / 5 + 32).toFixed(0),
    };
  }
}(
  "readdle-spark://",
  new Widget.Time().print("E d"),
).run();
