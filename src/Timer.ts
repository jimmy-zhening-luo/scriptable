"teal hourglass-half";
import Widget from "./app/widget";

void new class Timer extends Widget {
  protected runtime() {
    function extract(data?: string) {
      if (data === undefined)
        return null;

      const { start } = JSON.parse(data) as Field<never, "start">;

      return start === undefined
        ? null
        : new Timer.Time(start);
    }

    const store = extract(this.read()),
    feed = extract(
      this.subscribe("start", "json"),
    ),
    {
      start = null,
      update = false,
    } = store?.today === true
      ? {
          start: store,
        }
      : feed?.today === true
        ? {
            start: feed,
            update: true,
          }
        : {};

    if (start === null)
      this.text("+").centerAlignText();
    else {
      if (update)
        this.write(
          {
            start: start.print(),
          },
        );

      const end = start.in(8);

      if (new Timer.Time > end)
        this.text("\u2713").centerAlignText();
      else {
        this.text("Remaining").centerAlignText();

        const timer = this.widget.addStack();

        timer.spacing = 0;
        timer.centerAlignContent();

        const countdown = timer.addDate(
          end.date(),
        );

        countdown.font = this.style.round.regular(16);
        countdown.centerAlignText();
        countdown.applyTimerStyle();
      }
    }
  }
}("things:///show?id=today").run();
