import IWidget from "./iwidget";
import Style from "../../lib/ui";

const enum Default {
  Weight = 12,
}

export default abstract class<Setting = never> extends IWidget<Setting, true> {
  protected readonly style;

  constructor(
    url: Null<string> = null,
    title: boolean | string = false,
    {
      background = Color.black(),
      font = null as Null<Font>,
      weight = Default.Weight,
      spacing = Math.round(weight / 4),
      top = Default.Weight,
      trailing = Default.Weight,
      bottom = Default.Weight,
      leading = Default.Weight,
    } = {},
  ) {
    const style = new Style(weight);

    super(
      url,
      font ?? style.font(),
    );
    this.style = style;
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
        style.title(),
      );
      void this.line(style.size(1 / 6));
    }
  }

  protected override development = () => {
    void this.widget.presentSmall();
  };

  protected row(...texts: unknown[]) {
    const row = this.widget.addStack(),
    right = texts.pop(),
    columns = texts.map(
      text => {
        const column = row.addText(String(text));

        void row.addSpacer();

        return column;
      },
    );

    if (right !== undefined)
      void columns.push(
        row.addText(String(right as unknown)),
      );

    const font = this.style.font();

    for (const column of columns)
      column.font = font;

    return {
      row,
      columns,
    };
  }

  protected clock(
    timezone: Parameters<typeof IWidget.Time.prototype.offset>[0] = null,
    label = "--",
    font = "Menlo",
    ampm = true,
  ) {
    const now = new IWidget.Time,
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
      font,
      this.style.size(1.1),
    );
    void clock.addSpacer(
      this.style.size(1.25),
    );

    const dial = clock.addDate(zero.date());

    dial.font = this
      .style
      .round
      .regular(1.5);
    dial.applyTimerStyle();
    clock.addText(period).font = this
      .style
      .round
      .semibold(1.2);
    void clock.addSpacer(
      this.style.size(1.75),
    );
  }

  protected lastRefresh(
    label = "Latest: ",
    font = this.style.footnote(),
  ) {
    return this.text(
      label + new IWidget.Time().time(),
      font,
    );
  }
}
