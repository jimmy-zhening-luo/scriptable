// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

async function Weather() {
  Location.setAccuracyToKilometer();

  const {
    latitude,
    longitude,
  } = await Location.current(),
  req = new Request(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m&hourly=dew_point_2m&forecast_hours=1&timezone=auto&temperature_unit=fahrenheit`,
  ),
  {
    current: {
      relative_humidity_2m: humidity,
    },
    hourly: {
      dew_point_2m: [dew],
    },
  } = await req.loadJSON() as {
    current: {
      relative_humidity_2m: number;
    };
    hourly: {
      dew_point_2m: readonly [number];
    };
  };

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
      ) {
        const { humidity } = await Weather();

        this.text(
          (
            now > now.at(sunrise).in(3)
            && now < now.at(sunset).in(1)
              ? `Sunset: ${sunset}`
              : `Sunrise: ${sunrise}`
          ) + ` | RH ${humidity}%`,
        );
      }
    }
    catch (e) {
      console.error(
        "Unable to populate Sun or Weather data: "
        + String(e),
      );
      console.warn("Continuing...");
    }
  }
}

await new Clock(
  new Widget.Time().print("E d"),
).run();
