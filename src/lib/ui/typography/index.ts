import FontFamily from "./family";

export default class Style {
  public readonly font;
  public readonly round;
  public readonly mono;

  constructor(weight: number) {
    this.font = new FontFamily("", weight);
    this.round = new FontFamily("Rounded", weight);
    this.mono = new FontFamily("Monospaced", weight);
  }

  public title() {
    return this.font.semibold(
      2 * this.font.weight,
    );
  }

  public heading() {
    return this.font.semibold(
      Math.round(5 / 3 * this.font.weight),
    );
  }

  public subheading() {
    return this.font.semibold(
      Math.round(3 / 2 * this.font.weight),
    );
  }

  public footnote() {
    return this.font.light(
      Math.round(5 / 6 * this.font.weight),
    );
  }

  public body() {
    return this.font.regular();
  }

  public italic() {
    return this.font.italic();
  }

  public bold() {
    return this.font.bold();
  }

  public semibold() {
    return this.font.semibold();
  }
}
