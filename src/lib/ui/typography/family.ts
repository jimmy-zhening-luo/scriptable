export default class FontFamily<
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
