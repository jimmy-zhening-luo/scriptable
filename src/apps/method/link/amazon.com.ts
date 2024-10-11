import type { LinkPathProcessor } from "./processor";

const amzn_LinkPathProcessor = importModule<typeof LinkPathProcessor>("./processor");

class AmazonPathProcessor extends amzn_LinkPathProcessor<"amazon.com"> {
  protected process(path: string) {
    const processed = path.includes("/dp/")
      ? `/dp/${
        path
          .split("/dp/")
          .pop()
          ?.split("/")
          .shift() ?? ""
      }`
      : path;

    return processed;
  }
}

module.exports = AmazonPathProcessor;
