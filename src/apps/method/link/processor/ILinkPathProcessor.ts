abstract class ILinkPathProcessor<
  H extends string,
> {
  public readonly processed: string;

  constructor(
    protected readonly host: literalful<H>,
    path: string,
  ) {
    try {
      this
        .processed = this
          .process(
            path,
          );
    }
    catch (e) {
      throw new EvalError(
        `ILinkPathProcessor: ctor`,
        { cause: e },
      );
    }
  }

  protected abstract process(path: string): string;
}

module.exports = ILinkPathProcessor;
