/* eslint-disable stylistic/type-generic-spacing */
export default class <
  Variant extends
  | ""
  | "Rounded",
> {
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
    const size = this.size(scale);

    return this.variant === ""
      ? Font.systemFont(size)
      : Font[
          `regular${this.variant}SystemFont`
        ](size);
  }

  public italic(scale?: number) {
    return this.variant === ""
      ? Font.italicSystemFont(this.size(scale))
      : this.regular(scale);
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
    return Font[
      `${
        style
      }${
        this.variant
      }SystemFont`
    ](this.size(scale));
  }
}
