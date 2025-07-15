// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.text("Europe");
    this.clock(
      {
        timezone: "Europe/Zurich",
      },
    );
    this.text("China");
    this.clock(
      {
        timezone: "Asia/Shanghai",
      },
    );
    this.line(5);

    try {
      const sun = JSON.parse(
        this.feed(
          "sun",
          "json",
        ),
      ) as Record<
        | "sunrise"
        | "sunset",
        FieldTable
      >,
      today = new Widget
        .Time()
        .print("yyMMdd"),
      sunset = sun.sunset[today] ?? "Unavailable";

      this.text(
        "Sunset: " + sunset,
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
  new Widget
    .Time()
    .print("E d"),
).run();
