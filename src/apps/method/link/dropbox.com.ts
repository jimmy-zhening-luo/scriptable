import Processor from "./processor";

class DropboxProcessor extends Processor {
  protected process(path: string) {
    const nodes = path.split("/");

    return !path.startsWith("/scl/fi/")
      ? path
      : nodes.length < 4
        ? path
        : nodes.slice(0, 4).join("/");
  }
}

export default DropboxProcessor;
