// icon-color: orange; icon-glyph: clock;
import Widget from "./app/widget";

await new class Clock extends Widget<
  {
    clocks: Tuple<{
      timezone: Parameters<Widget["clock"]>[0];
      label: string;
    }>;
    sun: Field<"stream">;
    weather: {
      api: Field<
        | "userAgent"
        | "url"
      >;
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
        this.subscribe(
          setting.sun.stream,
          "json",
        ),
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
      console.error("Sun feed: ".concat(String(e)));
      console.warn("Continuing...");
    }

    try {
      const {
        humidity,
        dew,
      } = await this.weather(
        setting.weather.api.userAgent,
        setting.weather.api.url,
      );

      void badges.push(`\u224B\u2006${humidity}% ${dew}\u00B0`);
    }
    catch (e) {
      console.error("Weather API: ".concat(String(e)));
      console.warn("Continuing...");
    }

    if (badges.length !== 0)
      void this.text(
        badges.join(
          " ".repeat(4),
        ),
      );
  }

  private async weather(
    userAgent: string,
    url: string,
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

    const {
      latitude,
      longitude,
    } = await Widget.location(),
    weatherApi = new Request(
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
  new Widget.Time().print("E d"),
  "readdle-spark://",
).run();
