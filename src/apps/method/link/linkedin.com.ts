import Processor from ".";

class LinkedInProcessor extends Processor {
  protected process(path: string) {
    return path.startsWith("/mwlite/") ? path.slice(7) : path;
  }
}

export default LinkedInProcessor;
