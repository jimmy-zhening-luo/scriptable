export class QueryArgument {
  private readonly argument;
  private readonly consume;

  constructor(
    primarySelector: char,
    selector: char,
    flag: string,
    public readonly deselect: stringful,
    elision?: stringful,
  ) {
    this.consume = flag === ""
      && selector === ".";
    this.argument = this.consume
      ? elision === undefined
        ? primarySelector
        : primarySelector + elision as stringful
      : primarySelector + flag as stringful;
  }

  public select(tail: stringful[]) {
    if (this.consume || tail.length === 0)
      /* eslint-disable no-param-reassign */
      tail[0] = this.argument;
    else
      void tail.unshift(this.argument);

    return tail;
  }
}
