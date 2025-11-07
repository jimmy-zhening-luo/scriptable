export class QueryArgument {
  public readonly argument;
  private readonly consumes;

  constructor(
    primarySelector: char,
    matchedSelector: char,
    option: string,
    next?: stringful,
  ) {
    this.consumes = option === ""
      && matchedSelector !== primarySelector;
    this.argument = this.consumes
      ? next === undefined
        ? primarySelector
        : primarySelector + next as stringful
      : primarySelector + option as stringful;
  }

  public prepend(terms: stringful[]) {
    if (this.consumes || terms.length === 0)
      terms[0] = this.argument;
    else
      void terms.unshift(this.argument);

    return terms;
  }
}
