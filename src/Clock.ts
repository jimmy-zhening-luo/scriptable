// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

async function Weather() {
  Location.setAccuracyToTenMeters();

  const {
    latitude,
    longitude,
  } = await Location.current(),
  weatherApi = new Request(
    `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${latitude}&lon=${longitude}`,
  );

  weatherApi.headers = {
    "User-Agent": "iOS/Shortcuts"
  };

  const weather = await weatherApi.loadJSON() as {
    properties: {
      timeseries: readonly [
        {
          data: {
            instant: {
              details: {
                relative_humidity: number;
                dew_point_temperature: number;
              };
            };
          };
        }
      ];
    };
  },
  {
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

class Clock extends Widget {
  protected async runtime() {
    this.text("Europe");
    this.clock({ timezone: "Europe/Zurich" });
    this.line();
    this.text("China");
    this.clock({ timezone: "Asia/Shanghai" });
    this.line();

    const badges: string[] = [];

    try {
      const sun = JSON.parse(
        this.feed("sun", "json"),
      ) as Record<
        "sunrise" | "sunset",
        FieldTable
      >,
      now = new Widget.Time(),
      today = now.print("yyMMdd"),
      sunrise = sun.sunrise[today],
      sunset = sun.sunset[today];

      if (
        sunrise !== undefined
        && sunset !== undefined
      )
        badges.push(
          now > now.at(sunrise).in(3)
          && now < now.at(sunset).in(1)
            ? `🌘 ${sunset}`
            : `☀️ ${sunrise}`,
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
      const { humidity } = await Weather();

      badges.push(`💧${humidity}%`);
    }
    catch (e) {
      console.error(
        "Failed to call Weather API: "
        + String(e),
      );
      console.warn("Continuing...");
    }

    if (badges.length !== 0)
      this.text(badges.join("    "));
  }
}

await new Clock(
  new Clock.Time().print("E d"),
).run();
