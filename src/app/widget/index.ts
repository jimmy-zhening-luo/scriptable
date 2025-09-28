import IWidget from "../iwidget";
import Style from "../../lib/ui/typography";

const DEFAULT_WEIGHT = 12;

export default abstract class Widget<Setting = never> extends IWidget<Setting> {
  protected readonly style;
  private readonly weight;

  constructor(
    url: Null<string> = null,
    title: boolean | string = false,
    {
      background = Color.black(),
      weight = DEFAULT_WEIGHT,
      spacing = Math.round(weight / 4),
      top = DEFAULT_WEIGHT,
      trailing = DEFAULT_WEIGHT,
      bottom = DEFAULT_WEIGHT,
      leading = DEFAULT_WEIGHT,
    } = {},
  ) {
    super(url);
    this.weight = Math.round(weight);
    this.style = new Style(this.weight);
    this.widget.backgroundColor = background;
    this.widget.spacing = spacing;
    this.widget.setPadding(
      top,
      leading,
      bottom,
      trailing,
    );

    if (title !== false) {
      void this.text(
        title === true
          ? this.app
          : title,
        this.style.title(),
      );
      void this.line(Math.round(weight / 6));
    }
  }

  protected override development = () => {
    void this.widget.presentSmall();
  };

  protected override text(
    text: string,
    font: Null<Font> = this.style.body(),
  ) {
    const textbox = super.text(text);

    if (font !== null)
      textbox.font = font;

    return textbox;
  }

  protected clock(
    timezone: Parameters<typeof Widget.Time.prototype.offset>[0] = null,
    label = "--",
    ampm = true,
  ) {
    const now = new Widget.Time,
    destinationMidnight = now
      .midnight
      .in(now.offset(timezone)),
    destinationZero = destinationMidnight.in(
      now < destinationMidnight
        ? -24
        : now > destinationMidnight.in(24)
          ? 24
          : 0,
    ),
    { zero, period = "" } = ampm
      ? now < destinationZero.in(12)
        ? {
            zero: destinationZero.ago(
              now < destinationZero.in(1)
                ? 12
                : 0,
            ),
            period: "AM",
          }
        : {
            zero: destinationZero.in(
              now < destinationZero.in(13)
                ? 0
                : 12,
            ),
            period: "PM",
          }
      : { zero: destinationZero },
    clock = this.widget.addStack();

    clock.spacing = 0;
    clock.centerAlignContent();
    clock.addText(label).font = new Font(
      "Consolas",
      Math.round(this.weight * 1.1),
    );
    void clock.addSpacer(
      Math.round(this.weight * 1.25),
    );

    const dial = clock.addDate(zero.toDate());

    dial.font = this
      .style
      .round
      .regular(
        Math.round(this.weight * 1.5),
      );
    dial.applyTimerStyle();
    clock.addText(period).font = this
      .style
      .round
      .semibold(
        Math.round(this.weight * 1.2),
      );
    void clock.addSpacer(
      Math.round(this.weight * 1.75),
    );
  }

  protected lastRefresh(
    label = "Latest: ",
    font = this.style.footnote(),
  ) {
    if (!this.home)
      throw TypeError("Last refresh date can only be shown on Home Screen Widget");

    return this.text(
      label.concat(
        new Widget.Time().print("h:mm a"),
      ),
      font,
    );
  }
}
