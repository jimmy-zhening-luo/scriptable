import type IEngine from "./engine/IEngine.js";

const iEngine = importModule(
  `engine/IEngine`,
) as typeof IEngine;

export default class FindEngine extends iEngine {
  protected readonly find: string;

  constructor(
    find: string,
  ) {
    try {
      super(
        "find",
      );

      if (
        find
          .length > 0
      )
        this
          .find = find;
      else
        throw new SyntaxError(
          `'find' field empty`,
        );
    }
    catch (e) {
      throw new EvalError(
        `FindEngine: ctor`,
        { cause: e },
      );
    }
  }

  protected options() {
    try {
      const { find } = this;

      return { find };
    }
    catch (e) {
      throw new EvalError(
        `FindEngine: options`,
        { cause: e },
      );
    }
  }
}
module.exports = FindEngine;
