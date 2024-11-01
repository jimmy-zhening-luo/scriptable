import LinkPathProcessor from "./processor";

class DropboxPathProcessor extends LinkPathProcessor<"dropbox.com"> {
  protected process(path: string) {
    const nodes = path.split("/");

    return !path.startsWith("/scl/fi/")
      ? path
      : nodes.length < 4
        ? path
        : nodes.slice(0, 4).join("/");
  }
}

export default DropboxPathProcessor;
