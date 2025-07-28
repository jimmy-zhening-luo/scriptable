// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.text("Europe");
    this.clock({ timezone: "Europe/Zurich" });
    this.text("China");
    this.clock({ timezone: "Asia/Shanghai" });
    this.line(5);

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
        this.text(
          now > now.at(sunrise).in(3)
          && now < now.at(sunset).in(1)
            ? `Sunset: ${sunset}`
            : `Sunrise: ${sunrise}`,
        );
    }
    catch (e) {
      console.error(
        "Unable to populate Sun data due to error: "
        + String(e),
      );
      console.warn("Continuing...");
    }
  }
}

new Clock(
  new Widget.Time().print("E d"),
).run();
