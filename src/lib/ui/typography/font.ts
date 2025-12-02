/* eslint-disable stylistic/type-generic-spacing */
export default class <
  Variant extends
  | ""
  | "Rounded",
> {
  private readonly fonts: PartialRecord<
    keyof typeof this,
    (size: number) => Font
  > = {};

  constructor(
    private readonly variant: Variant,
    private readonly weight: number,
  ) {}

  public size(scale?: number) {
    return scale === undefined
      ? this.weight
      : Math.round(scale * this.weight);
  }

  public regular(scale?: number) {
    return (
      this.fonts.regular ??= this.variant
        ? Font[`regular${this.variant}SystemFont`]
        : Font.systemFont
    )(this.size(scale));
  }

  public italic(scale?: number) {
    return this.variant
      ? this.regular(scale)
      : Font.italicSystemFont(this.size(scale));
  }

  public bold(scale?: number) {
    return this.font("bold", scale);
  }

  public semibold(scale?: number) {
    return this.font("semibold", scale);
  }

  public medium(scale?: number) {
    return this.font("medium", scale);
  }

  public light(scale?: number) {
    return this.font("light", scale);
  }

  private font(
    style:
      | "bold"
      | "semibold"
      | "medium"
      | "light",
    scale?: number,
  ) {
    return (
      this.fonts[style] ??= Font[
        `${
          style
        }${
          this.variant
        }SystemFont`
      ]
    )(this.size(scale));
  }
}
