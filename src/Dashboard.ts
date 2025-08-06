// icon-color: teal; icon-glyph: info-circle;
import Widget from "./core/widget";

class Dashboard extends Widget {
  protected runtime() {
    const { input } = this;

    if (typeof input !== "string" || input === "")
      this.text("—").centerAlignText();
    else {
      const finish = (new Widget.Time)
        .at(this.input)
        .in(8);

      if (new Widget.Time > finish)
        this.text("Done").centerAlignText();
      else {
        this.text("Remaining").centerAlignText();

        const timer = this.widget.addStack();

        timer.spacing = 0;
        timer.centerAlignContent();
    
        const countdown = timer.addDate(
          finish.toDate(),
        );

        countdown.font = this.style.round.regular(16);
        countdown.centerAlignText();
        countdown.applyTimerStyle();
      }
    }
  }
}

new Dashboard("").run();
