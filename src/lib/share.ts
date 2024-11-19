import App from "./app";

export default abstract class Share<
  Output = never,
  Schema = never,
> extends App<string[], Null<Output>, Schema> {
  protected readonly abstract type:
    | "plainTexts"
    | "urls"
    | "fileURLs";

  protected getInput() {
    return args[this.type] as undefined | string[];
  }

  protected output(runtime: ReturnType<Share<Output>["runtime"]>) {
    log(runtime);

    return runtime;
  }
}
