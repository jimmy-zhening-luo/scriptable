import IApp from "./proto";

export default abstract class Share<
  Output extends string = never,
  Schema = never,
> extends IApp<
    string[],
    Null<Output>,
    Schema
  > {
  protected readonly abstract shareInput: (
    | "plainTexts"
    | "urls"
    | "fileURLs"
  );

  protected getInput() {
    return args[this.shareInput] as Undef<string[]>;
  }

  protected output(runtime: ReturnType<Share<Output>["runtime"]>) {
    if (typeof runtime === "string")
      Pasteboard.copy(runtime);

    return runtime;
  }

  protected test(runtime: ReturnType<Share<Output>["runtime"]>) {}
}
