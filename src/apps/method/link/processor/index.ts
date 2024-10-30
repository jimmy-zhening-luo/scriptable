abstract class LinkPathProcessor<Host extends string> {
  public readonly processed: string;

  constructor(host: literalful<Host>, path: string) {
    log(host);
    this.processed = this.process(path);
  }

  protected abstract process(path: string): string;
}

export default LinkPathProcessor;
