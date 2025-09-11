// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget<
  {
    clocks: Tuple<{
      timezone: Parameters<Widget["clock"]>[0];
      label: string;
    }>;
    sun: {
      stream: string;
    };
    weather: {
      api: {
        userAgent: string;
        endpoint: string;
        query: {
          latitude: string;
          longitude: string;
          rest?: string;
        };
      };
    };
  }
> {
  protected async runtime() {
    const { setting } = this;

    void this.line(4);
    this.clock(
      setting.clocks[0].timezone,
      setting.clocks[0].label,
    );
    void this.line(4);
    this.clock(
      setting.clocks[1].timezone,
      setting.clocks[1].label,
    );
    void this.line(16);

    const badges: string[] = [];

    try {
      const sun = JSON.parse(
        this.stream(setting.sun.stream, "json"),
      ) as Record<
        | "sunrise"
        | "sunset",
        FieldTable
      >,
      now = new Widget.Time,
      today = now.print("yyMMdd"),
      sunrise = sun.sunrise[today],
      sunset = sun.sunset[today];

      if (
        sunrise !== undefined
        && sunset !== undefined
      )
        void badges.push(
          (
            now > now.at(sunrise).in(3)
            && now < now.at(sunset).in(1)
              ? ["\u263E", sunset]
              : ["\u235C ", sunrise]
          )
            .join("\u2009"),
        );
    }
    catch (e) {
      console.error(
        "Failed to retrieve Sun feed: "
        + String(e),
      );
      console.warn("Continuing...");
    }

    try {
      const {
        humidity,
        dew,
      } = await this.weather(
        setting.weather.api.userAgent,
        setting.weather.api.endpoint,
        setting.weather.api.query,
      );

      void badges.push(`\u224B\u2006${humidity}% ${dew}°`);
    }
    catch (e) {
      console.error(
        "Failed to call Weather API: "
        + String(e),
      );
      console.warn("Continuing...");
    }

    if (badges.length !== 0)
      void this.text(badges.join("    "));
  }

  private async weather(
    userAgent: string,
    endpoint: string,
    query: {
      latitude: string;
      longitude: string;
      rest?: string;
    },
  ) {
    interface IWeather {
      properties: {
        timeseries: readonly [
          {
            data: {
              instant: {
                details: Scalar<
                  | "relative_humidity"
                  | "dew_point_temperature"
                >;
              };
            };
          },
        ];
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

    const { latitude, longitude } = await Widget.location(0.01),
    weatherApi = new Request(
      `${endpoint}?${query.latitude}=${latitude}&${query.longitude}=${longitude}` + (query.rest === undefined ? "" : `&${query.rest}`),
    );

    weatherApi.headers = {
      "User-Agent": userAgent,
    };

    const {
      humidity,
      dew,
    } = parseWeather(
      await weatherApi.loadJSON() as IWeather,
    );

    return {
      humidity: Math.round(humidity),
      dew: Math.round(dew * 9 / 5 + 32),
    };
  }
}

await new Clock(
  new Widget.Time().print("E d"),
  "home",
  {
    url: "readdle-spark://",
  },
).run();
