export class QueryArgument {
  public readonly argument;
  private readonly consumes;

  constructor(
    primarySelector: char,
    selector: char,
    option: string,
    next?: stringful,
  ) {
    this.consumes = option === ""
      && selector === ".";
    this.argument = this.consumes
      ? next === undefined
        ? primarySelector
        : primarySelector + next as stringful
      : primarySelector + option as stringful;
  }

  public prepend(terms: stringful[]) {
    if (this.consumes || terms.length === 0)
      /* eslint-disable no-param-reassign */
      terms[0] = this.argument;
    else
      void terms.unshift(this.argument);

    return terms;
  }
}
