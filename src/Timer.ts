// icon-color: teal; icon-glyph: hourglass-half;
import Widget from "./core/widget";

class Dashboard extends Widget {
  protected runtime() {
    const { input } = this;

    if (typeof input !== "string" || input === "")
      this.text("+").centerAlignText();
    else {
      const now = new Widget.Time,
      end = now.at(this.input).in(8);

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
}

void new Dashboard(
  "",
  true,
  {
    url: "things:///show?id=today",
  },
).run();
