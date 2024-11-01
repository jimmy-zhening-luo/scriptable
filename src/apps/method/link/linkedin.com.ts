import LinkPathProcessor from "./processor";

class LinkedInPathProcessor extends LinkPathProcessor<"linkedin.com"> {
  protected process(path: string) {
    return path.startsWith("/mwlite/") ? path.slice(7) : path;
  }
}

export default LinkedInPathProcessor;
