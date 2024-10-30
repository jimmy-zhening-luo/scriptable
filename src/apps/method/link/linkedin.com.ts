import type LinkPathProcessor from "./processor";

const lnkd_ILinkPathProcessor = importModule<typeof LinkPathProcessor>("./processor");

class LinkedInPathProcessor extends lnkd_ILinkPathProcessor<"linkedin.com"> {
  protected process(path: string) {
    return path.startsWith("/mwlite/") ? path.slice(7) : path;
  }
}

export default LinkedInPathProcessor;
