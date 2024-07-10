abstract class ILinkPathProcessor<Host extends string> {
  public readonly processed: string;

  constructor(
    protected readonly host: literalful<Host>,
    path: string,
  ) {
    try {
      this.processed = this.process(path);
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
