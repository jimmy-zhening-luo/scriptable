abstract class LinkPathProcessor<Host extends string> {
  public readonly processed: string;
  public readonly postprocessor: Null<string> = null;

  constructor(
    protected readonly host: literalful<Host>,
    path: string,
  ) {
    try {
      const process = this.process(path);

      if (typeof process === "string")
        this.processed = process;
      else {
        this.processed = process.processed;
        this.postprocessor = process.postprocessor;
      }
    }
    catch (e) {
      throw new EvalError(
        `LinkPathProcessor: ctor`,
        { cause: e },
      );
    }
  }

  protected abstract process(path: string): string | Field<"processed" | "postprocessor">;
}

module.exports = LinkPathProcessor;
