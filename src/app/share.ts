import App from "./proto";

export default abstract class Share<
  Output extends string = never,
  Schema = never,
> extends App<string[], Null<Output>, Schema> {
  protected readonly abstract type:
    | "plainTexts"
    | "urls"
    | "fileURLs";

  protected getInput() {
    return args[this.type] as Undef<string[]>;
  }

  protected output(runtime: ReturnType<Share<Output>["runtime"]>) {
    console.log(runtime);

    if (typeof runtime === "string")
      Pasteboard.copy(runtime);

    return runtime;
  }
}
