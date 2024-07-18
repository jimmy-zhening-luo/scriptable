const amzn_LinkPathProcessor = importModule<typeof LinkPathProcessor>(
  `processor/LinkPathProcessor`,
);

class AmazonPathProcessor extends amzn_LinkPathProcessor<"amazon.com"> {
  protected process(path: string) {
    try {
      const processed = path.includes("/dp/")
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

      return {
        processed,
        postprocessor: "Fakespot",
      };
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
