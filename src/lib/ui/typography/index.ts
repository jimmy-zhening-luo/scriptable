import Fonts from "./fonts";

export default class Style {
  public readonly fonts;

  constructor(weight: number) {
    this.fonts = new Fonts(weight);
  }

  public title() {
    return this
      .fonts
      .semibold(2 * this.fonts.weight);
  }

  public heading() {
    return this
      .fonts
      .semibold(
        Math.round(5 / 3 * this.fonts.weight),
      );
  }

  public subheading() {
    return this
      .fonts
      .semibold(
        Math.round(3 / 2 * this.fonts.weight),
      );
  }

  public footnote() {
    return this
      .fonts
      .light(
        Math.round(5 / 6 * this.fonts.weight),
      );
  }

  public body() {
    return this
      .fonts
      .regular(this.fonts.weight);
  }

  public italic() {
    return this
      .fonts
      .italic(this.fonts.weight);
  }

  public bold() {
    return this
      .fonts
      .bold(this.fonts.weight);
  }

  public semibold() {
    return this
      .fonts
      .semibold(this.fonts.weight);
  }

  public mono() {
    return this
      .fonts
      .mono
      .regular(this.fonts.weight);
  }
}
