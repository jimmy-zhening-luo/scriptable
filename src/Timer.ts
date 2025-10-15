// icon-color: teal; icon-glyph: hourglass-half;
import Widget from "./app/widget";

void new class Timer extends Widget {
  protected runtime() {
    const feed = this.subscribe("when", "json"),
    { when } = feed === undefined ? {} : JSON.parse(feed) as { when?: string },
    time = when === undefined ? null : new Timer.Time(when),
    now = new Timer.Time;

    if (
      time === null
      || time < now.midnight
      || time >= now.tomorrow
    )
      this.text("+").centerAlignText();
    else {
      const end = time.in(8);

      if (now > end)
        this.text("\u2713").centerAlignText();
      else {
        this.text("Remaining").centerAlignText();

        const timer = this.widget.addStack();

        timer.spacing = 0;
        timer.centerAlignContent();

        const countdown = timer.addDate(
          end.toDate(),
        );

        countdown.font = this.style.round.regular(16);
        countdown.centerAlignText();
        countdown.applyTimerStyle();
      }
    }
  }
}("things:///show?id=today").run();
