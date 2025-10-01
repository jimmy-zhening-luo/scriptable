class FontFamily<
  Variant extends
  | ""
  | "Rounded",
> {
  constructor(
    public readonly variant: Variant,
    public readonly weight: number,
  ) {}

  public regular(size = this.weight) {
    return this.variant === ""
      ? Font.systemFont(size)
      : Font[
          `regular${
            this.variant
          }SystemFont`
        ](size);
  }

  public italic(size = this.weight) {
    return this.variant === ""
      ? Font.italicSystemFont(size)
      : this.regular(size);
  }

  public bold(size?: number) {
    return this.font("bold", size);
  }

  public semibold(size?: number) {
    return this.font("semibold", size);
  }

  public medium(size?: number) {
    return this.font("medium", size);
  }

  public light(size?: number) {
    return this.font("light", size);
  }

  private font(
    style:
      | "bold"
      | "semibold"
      | "medium"
      | "light",
    size = this.weight,
  ) {
    return Font[
      `${
        style
      }${
        this.variant
      }SystemFont`
    ](size);
  }
}

export default class Style {
  public readonly body;
  public readonly round;

  constructor(weight: number) {
    this.body = new FontFamily("", weight);
    this.round = new FontFamily("Rounded", weight);
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
}
