const lnkd_ILinkPathProcessor = importModule(
  "processor/ILinkPathProcessor",
) as typeof ILinkPathProcessor;

class LinkedInPathProcessor extends lnkd_ILinkPathProcessor<
  "linkedin.com"
> {
  protected process(
    path: string,
  ) {
    try {
        if (
          path
            .startsWith(
              "/mwlite/",
            )
        )
          path = path
            .slice(
              7,
            );
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
