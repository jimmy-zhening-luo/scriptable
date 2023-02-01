class Finite extends Bounds {
  override isBounded(
    value: undefined | null | number
  ): boolean {
    return super.isBounded(value)
      && value !== Infinity
      && value !== -Infinity;
  }
}
