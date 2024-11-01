import LinkPathProcessor from "./processor";

class AmazonPathProcessor extends LinkPathProcessor<"amazon.com"> {
  protected process(path: string) {
    const productPath = path.split("/dp/");

    return productPath.length < 2
      ? path
      : `/dp/${((productPath as Arrayfully)[1].split("/") as Arrayful)[0]}`;
  }
}

export default AmazonPathProcessor;
