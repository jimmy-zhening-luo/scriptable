const a_IEngine: typeof IEngine = importModule(
  "engine/IEngine",
) as typeof IEngine;

class InlineEngine extends a_IEngine {
  protected options(): Record<string, never> {
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
