import App from "./base";

export default abstract class Widget<Schema = never> extends App<string, null, Schema> {
  protected readonly widget = new ListWidget();

  protected getInput() {
    return args.widgetParameter as Undef<string>;
  }

  protected output(runtime: ReturnType<Widget["runtime"]>) {
    Script.setWidget(this.widget);
    console.log("Widget set");

    return runtime;
  }
}
