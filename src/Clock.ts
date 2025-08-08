// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

async function Weather(API_KEY: string) {
  Location.setAccuracyToTenMeters();

  const {
    latitude,
    longitude,
  } = await Location.current(),
  { Key: location = null } = new Request(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`,
  )
    .loadJSON() as { Key?: string; };

  if (location === null)
    throw new URIError("Failed to obtain location key from Weather API");

  const [weather] = await new Request(
    `https://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${API_KEY}&details=true`,
  )
    .loadJSON() as readonly [
      {
        RelativeHumidity: number;
        DewPoint: {
          Imperial: {
            Value: number;
          };
        };
      },
    ],
  {
    RelativeHumidity: humidity,
    DewPoint: {
      Imperial: {
        Value: dew,
      },
    },
  } = weather;

  return {
    humidity,
    dew,
  };
}

class Clock extends Widget<Field<"api_key">> {
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
      const { humidity } = await Weather(
        this.setting.api_key,
      );

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
