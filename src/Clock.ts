// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.clock();
    this.line(5);
    this.text("China");
    this.clock(
      {
        timezone: "Asia/Shanghai",
      },
    );
    this.line();

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
      console.error("Unable to populate Sun data due to error: " + e);
    }
    finally {
      console.warn("Continuing to show Widget sans Sun features");
    }
  }
}

new Clock(
  new Widget
    .Time()
    .print("EEEE d"),
).run();
