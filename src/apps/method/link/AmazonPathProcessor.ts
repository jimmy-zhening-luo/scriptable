const amzn_ILinkPathProcessor = importModule(
  "processor/ILinkPathProcessor",
) as typeof ILinkPathProcessor;

class AmazonPathProcessor extends amzn_ILinkPathProcessor<
  "amazon.com"
> {
  protected process(
    path: string,
  ) {
    try {
      return path
        .includes(
          "/dp/",
        )
          ? [
              "/dp/",
              (
                path
                  .split(
                    "/dp/",
                  )
                  .pop()
                  ?? ""
              )
                .split(
                  "/",
                )
                .shift()
                ?? "",
            ]
              .join(
                "",
              )
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
