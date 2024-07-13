const amzn_LinkPathProcessor = importModule(
  `processor/LinkPathProcessor`,
) as typeof LinkPathProcessor;

class AmazonPathProcessor extends amzn_LinkPathProcessor<"amazon.com"> {
  protected process(path: string) {
    try {
      return path.includes("/dp/")
        ? [
            "/dp/",
            (
              path
                .split("/dp/")
                .pop() ?? ""
            )
              .split("/")
              .shift() ?? "",
          ].join("")
        : path;
    }
    catch (e) {
      throw new EvalError(
        `AmazonPathProcessor: process`,
        { cause: e },
      );
    }
  }
}

module.exports = AmazonPathProcessor;
