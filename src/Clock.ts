// icon-color: orange; icon-glyph: clock;
import Widget from "./app/widget";

await new class Clock extends Widget<
  {
    clocks: Tuple<{
      timezone: Parameters<Widget["clock"]>[0];
      label: string;
    }>;
  }
  & Record<
    | "sun"
    | "weather",
    Record<
      "api",
      Field<
        | "userAgent"
        | "url"
      >
    >
  >
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

    const {
      latitude,
      longitude,
    } = await Clock.location(),
    badges: string[] = [];

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
      } = sun
        .results;

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
        .concat(
          "&date=",
          date.print("yyyy-MM-dd"),
        ),
    );

    const {
      sunrise,
      sunset,
    } = parseSun(
      await sunApi.loadJSON() as ISun,
    ),
    dateString = date.print("MMMM dd, yyyy");

    function sunTime(
      dateString: string,
      sun: string,
    ) {
      return new Clock.Time(
        dateString.concat(
          " ",
          sun,
        ),
      );
    }

    return {
      sunrise: sunTime(dateString, sunrise),
      sunset: sunTime(dateString, sunset),
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
