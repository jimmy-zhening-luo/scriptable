"teal hourglass-half";
import Widget from "./app/widget";

void new class Timer extends Widget {
  protected runtime() {
    function extract(data?: string) {
      return data === undefined
        ? null
        : new Timer.Time(
            (JSON.parse(data) as { when: string })
              .when,
          );
    }

    const store = extract(
      this.read(),
    ),
    feed = extract(
      this.subscribe("when", "json"),
    ),
    {
      when = null,
      update = false,
    } = store?.today ?? false
      ? {
          when: store,
        }
      : feed?.today ?? false
        ? {
            when: feed,
            update: true,
          }
        : {};

    if (when === null)
      this.text("+").centerAlignText();
    else {
      if (update)
        this.write(
          {
            when: when.print(),
          },
        );

      const end = when.in(8);

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
