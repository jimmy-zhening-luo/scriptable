import type { LinkPathProcessor } from "./processor/index";

const drop_ILinkPathProcessor = importModule<typeof LinkPathProcessor>("./processor/index");

class DropboxPathProcessor extends drop_ILinkPathProcessor<"dropbox.com"> {
  protected process(path: string) {
    if (!path.startsWith("/scl/fi/"))
      return path;
    else {
      const nodes = path.split("/");

      return nodes.length < 4 ? path : nodes.slice(0, 4).join("/");
    }
  }
}

module.exports = DropboxPathProcessor;
