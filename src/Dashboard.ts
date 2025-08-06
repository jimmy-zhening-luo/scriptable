// icon-color: teal; icon-glyph: info-circle;
import Widget from "./core/widget";

class Dashboard extends Widget {
  protected runtime() {
    this
      .text("Finish")
      .centerAlignText();

    const timer = this.widget.addStack();

    timer.spacing = 0;
    timer.centerAlignContent();

    const countdown = timer.addDate(
      (new Widget.Time)
        .at(this.input)
        .in(8)
        .toDate(),
    );

    countdown.font = this.style.round.regular(16);
    countdown.centerAlignText();
    countdown.applyTimerStyle();
  }
}

new Dashboard("").run();
