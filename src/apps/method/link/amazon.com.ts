import type LinkPathProcessor from "./processor";

const amzn_LinkPathProcessor = importModule<typeof LinkPathProcessor>("./processor");

class AmazonPathProcessor extends amzn_LinkPathProcessor<"amazon.com"> {
  protected process(path: string) {
    const productPath = path.split("/dp/");

    return productPath.length < 2
      ? path
      : `/dp/${((productPath as Arrayfully)[1].split("/") as Arrayful)[0]}`;
  }
}

export default AmazonPathProcessor;
