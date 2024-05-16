abstract class IUrlComponent<UC extends string> {
  protected readonly validator: ValidString<UC>;

  constructor(component: string) {
    try {
      this.validator = this.validate(
        component,
      );
    }
    catch (e) {
      throw new EvalError(
        `IUrlComponent: ctor`,
        { cause: e },
      );
    }
  }

  protected get ValidString(): typeof ValidString {
    try {
      return importModule(
        "./common/validators/base/string/valid/ValidString",
      ) as typeof ValidString;
    }
    catch (e) {
      throw new ReferenceError(
        `IUrlComponent: import ValidString`,
        { cause: e },
      );
    }
  }

  protected abstract validate(component: string): IUrlComponent<UC>["validator"];
}

module.exports = IUrlComponent;
