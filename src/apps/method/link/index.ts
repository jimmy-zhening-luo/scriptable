abstract class Processor {
  public readonly processed: string;

  constructor(path: string) {
    this.processed = this.process(path);
  }

  protected abstract process(path: string): string;
}

export default Processor;
