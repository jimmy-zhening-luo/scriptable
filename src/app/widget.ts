import App from "./base";

export default abstract class Widget<Schema = never> extends App<string, null, Schema> {
  protected getInput() {
    return args.widgetParameter ?? "";
  }

  protected output(runtime: ReturnType<Widget["runtime"]>) {
    return runtime;
  }
}
