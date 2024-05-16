abstract class IUrlComponent {
  protected readonly validator: ValidString;

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

  protected abstract validate(component: string): ValidString;
}

module.exports = IUrlComponent;
