import App from "./app";

abstract class Share<
  InputType extends
    | "plainTexts"
    | "urls"
    | "fileURLs" = "urls"
  Output = never,
  Schema = never,
> extends App<string[], Null<Output>, Schema> {
  protected readonly abstract type: InputType;

  protected getInput() {
    return args[this.type] as undefined | string[];
  }

  protected output(runtime: ReturnType<Share<InputType, Output>["runtime"]>) {
    log(runtime);

    return runtime;
  }
}

export default Share;
