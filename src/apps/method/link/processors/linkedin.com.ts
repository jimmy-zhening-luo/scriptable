import type ILinkPathProcessor from "./processor/ILinkPathProcessor.js";

const iLinkPathProcessor = importModule(
  `processor/ILinkPathProcessor`,
) as typeof ILinkPathProcessor;

export default class LinkedInPathProcessor extends iLinkPathProcessor<
  "linkedin.com"
> {
  protected process(
    path: string,
  ) {
    try {
      return path
        .startsWith(
          "/mwlite/",
        )
        ? path
          .slice(
            7,
          )
        : path;
    }
    catch (e) {
      throw new EvalError(
        `LinkedInPathProcessor: process`,
        { cause: e },
      );
    }
  }
}
module.exports = LinkedInPathProcessor;
