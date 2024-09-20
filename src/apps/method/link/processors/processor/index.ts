abstract class LinkPathProcessor<Host extends string> {
  public readonly processed: string;
  public readonly postprocessor: Null<string> = null;

  constructor(protected readonly host: literalful<Host>, path: string) {
    this.processed = this.process(path);
  }

  protected abstract process(path: string): string;
}

module.exports = LinkPathProcessor;
export type { LinkPathProcessor };
