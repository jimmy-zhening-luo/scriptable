import type { LinkPathProcessor } from "./processor/index";

const amzn_LinkPathProcessor = importModule<typeof LinkPathProcessor>("./processor/index");

class AmazonPathProcessor extends amzn_LinkPathProcessor<"amazon.com"> {
  protected process(path: string) {
    const processed = path.includes("/dp/") ? ["/dp/", (path.split("/dp/").pop() ?? "").split("/").shift() ?? ""].join("") : path;

    return { processed, postprocessor: "Fakespot" };
  }
}

module.exports = AmazonPathProcessor;
