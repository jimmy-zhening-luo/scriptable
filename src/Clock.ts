// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected async runtime() {
    void this.line(4);
    this.clock("Europe/Zurich", "EU");
    void this.line(4);
    this.clock("Asia/Shanghai", "CN");
    void this.line(16);

    const badges: string[] = [];

    try {
      const sun = JSON.parse(
        this.stream("sun", "json"),
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
          now > now.at(sunrise).in(3)
          && now < now.at(sunset).in(1)
            ? `\u263E\u2009${sunset}`
            : `\u235C ${sunrise}`,
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
      } = await this.weather();

      void badges.push(`\u26C6\u2006${humidity}% ${dew}°`);
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

  private async weather() {
    const { latitude, longitude } = await Widget.location(0.01),
    weatherApi = new Request(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${latitude}&lon=${longitude}`,
    );

    weatherApi.headers = {
      "User-Agent": "iOS/Shortcuts",
    };

    const weather = await weatherApi.loadJSON() as {
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
    },
    {
      relative_humidity,
      dew_point_temperature,
    } = weather
      .properties
      .timeseries[0]
      .data
      .instant
      .details;

    return {
      humidity: Math.round(relative_humidity),
      dew: Math.round(dew_point_temperature * 9 / 5 + 32),
    };
  }
}

await new Clock(
  new Widget.Time().print("E d"),
  "home",
  {
    url: "readdle-spark://",
    background: Color.black(),
  },
).run();
