const lnkd_ILinkPathProcessor = importModule<typeof LinkPathProcessor>(
  `processor/LinkPathProcessor`,
);

class LinkedInPathProcessor extends lnkd_ILinkPathProcessor<"linkedin.com"> {
  protected process(path: string) {
    try {
      return path.startsWith("/mwlite/")
        ? path.slice(7)
        : path;
    }
    catch (e) {
      throw new Error(
        `LinkedInPathProcessor: process`,
        { cause: e },
      );
    }
  }
}

module.exports = LinkedInPathProcessor;
