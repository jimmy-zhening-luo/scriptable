import IWidget from "./iwidget";
import Style from "../../lib/ui";

const enum WidgetSize {
  Small,
  Medium,
  Large,
}
const enum Weight {
  Default = 12,
}

export default abstract class<Setting = never> extends IWidget<Setting> {
  protected readonly size;
  protected readonly style;
  protected readonly font;

  constructor(
    url?: string,
    title: boolean | string = false,
    {
      background = Color.black(),
      size = WidgetSize.Small,
      font = null as Null<Font>,
      weight = Weight.Default,
      spacing = Math.round(weight / 4),
      top = Weight.Default,
      trailing = top as number,
      bottom = top as number,
      leading = trailing as unknown as number,
    } = {},
    tapPreview?: boolean,
  ) {
    super(url, tapPreview);
    this.size = size;
    this.style = new Style(weight);
    this.font = font ?? this.style.font();
    this.widget.backgroundColor = background;
    this.widget.spacing = spacing;
    this.widget.setPadding(
      top,
      leading,
      bottom,
      trailing,
    );

    if (title) {
      void this.text(
        title === true
          ? this.app
          : title,
        this.style.title(),
      );
      void this.line(1 / 6);
    }
  }

  protected override text(
    text: unknown,
    font?: Font,
  ) {
    const field = super.text(text);

    field.font = font ?? this.font;

    return field;
  }

  protected preview() {
    switch (this.size) {
    case WidgetSize.Small:
      void this.widget.presentSmall();
      break;
    case WidgetSize.Medium:
      void this.widget.presentMedium();
      break;
    default:
      void this.widget.presentLarge();
    }
  }

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

    if (right)
      void columns.push(
        row.addText(String(right as unknown)),
      );

    const { font } = this;

    for (const column of columns)
      column.font = font;

    return {
      row,
      columns,
    };
  }

  protected line(height = 0) {
    return this
      .widget
      .addSpacer(
        this.style.size(height),
      );
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
      .in(now.offset(timezone));

    const enum Wall {
      Today,
      Hour,
      Midday = 12 * Hour,
      Afternoon,
      Tomorrow = 2 * Midday,
      Yesterday = -Tomorrow,
    }
    const destinationZero = destinationMidnight.in(
      now < destinationMidnight
        ? Wall.Yesterday
        : now > destinationMidnight.in(Wall.Tomorrow)
          ? Wall.Tomorrow
          : Wall.Today,
    ),
    { zero, period = "" } = ampm
      ? now < destinationZero.in(Wall.Midday)
        ? {
            zero: destinationZero.ago(
              now < destinationZero.in(Wall.Hour)
                ? Wall.Midday
                : Wall.Today,
            ),
            period: "AM",
          }
        : {
            zero: destinationZero.in(
              now < destinationZero.in(Wall.Afternoon)
                ? Wall.Today
                : Wall.Midday,
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
