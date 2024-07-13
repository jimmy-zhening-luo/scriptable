const lnkd_ILinkPathProcessor = importModule(
  `processor/LinkPathProcessor`,
) as typeof LinkPathProcessor;

class LinkedInPathProcessor extends lnkd_ILinkPathProcessor<"linkedin.com"> {
  protected process(path: string) {
    try {
      return path.startsWith("/mwlite/")
        ? path.slice(7)
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
