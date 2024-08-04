const lnkd_ILinkPathProcessor = importModule<typeof LinkPathProcessor>(`processor/index`);

class LinkedInPathProcessor extends lnkd_ILinkPathProcessor<"linkedin.com"> {
  protected process(path: string) {
    return path.startsWith("/mwlite/") ? path.slice(7) : path;
  }
}

module.exports = LinkedInPathProcessor;
