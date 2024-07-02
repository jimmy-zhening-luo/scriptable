import type ILinkPathProcessor from "./processor/ILinkPathProcessor.js";

const iLinkPathProcessor = importModule(
  `processor/ILinkPathProcessor`,
) as typeof ILinkPathProcessor;

export default class AmazonPathProcessor extends iLinkPathProcessor<
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
