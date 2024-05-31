const a_IEngine = importModule(
  `engine/IEngine`,
) as typeof IEngine;

class InlineEngine extends a_IEngine {
  protected options() {
    try {
      return {};
    }
    catch (e) {
      throw new EvalError(
        `AppEngine: options`,
        { cause: e },
      );
    }
  }
}

module.exports = InlineEngine;
