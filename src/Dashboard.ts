// icon-color: teal; icon-glyph: info-circle;
import Widget from "./core/widget";

class Dashboard extends Widget {
  protected runtime() {
    const { input } = this;

    if (typeof input !== "string" || input === "")
      void this.text("\u2713").centerAlignText();
    else {
      const end = new Widget
        .Time()
        .at(this.input)
        .in(8);

      if (new Widget.Time > end)
        void this.text("Done").centerAlignText();
      else {
        void this.text("Remaining").centerAlignText();

        const timer = this.widget.addStack();

        timer.spacing = 0;
        void timer.centerAlignContent();

        const countdown = timer.addDate(
          end.toDate(),
        );

        countdown.font = this.style.round.regular(16);
        void countdown.centerAlignText();
        void countdown.applyTimerStyle();
      }
    }
  }
}

void new Dashboard(
  "",
  "home",
  {
    url: "things:///show?id=today",
    background: Color.black(),
  },
).run();
