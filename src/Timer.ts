"teal hourglass-half";
import Widget from "./app/widget";

void new class Timer extends Widget {
  protected runtime() {
    function extract(data?: string) {
      if (!data)
        return null;

      const timer = JSON.parse(data) as {
        start: number | string;
        modified: number | string;
      };

      return {
        start: new Timer.Time(timer.start),
        modified: new Timer.Time(timer.modified),
      };
    }

    const store = extract(this.read()),
    feed = extract(
      this.subscribe("start", "json"),
    ),
    {
      start,
      modified,
      update = false,
    } = store?.start.today
      && (
        !feed
        || store.modified.in(0, 0, 1) >= feed.modified
      )
      ? store as typeof store & Flag<"update">
      : feed?.start.today
        ? {
            start: feed.start,
            modified: feed.modified,
            update: true,
          }
        : {};

    if (start) {
      if (update)
        this.write(
          {
            start: start.epoch,
            modified: modified!.epoch,
          },
        );

      const end = start.in(8);

      if (new Timer.Time > end)
        this
          .text(
            end.time({ icon: "\u2713\u2009  " }),
          )
          .centerAlignText();
      else {
        this.text("Remaining").centerAlignText();

        const timer = this.widget.addStack();

        timer.spacing = 0;
        timer.centerAlignContent();

        const countdown = timer.addDate(
          end.date(),
        );

        countdown.font = this.style.round.regular(4 / 3);
        countdown.centerAlignText();
        countdown.applyTimerStyle();
      }
    }
    else
      this.text("+").centerAlignText();
  }
}("things:///show?id=today").run();
