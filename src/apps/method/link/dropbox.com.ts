import type { LinkPathProcessor } from "./processor";

const drop_ILinkPathProcessor = importModule<typeof LinkPathProcessor>("./processor");

class DropboxPathProcessor extends drop_ILinkPathProcessor<"dropbox.com"> {
  protected process(path: string) {
    const nodes = path.split("/");

    return !path.startsWith("/scl/fi/")
      ? path
      : nodes.length < 4
        ? path
        : nodes.slice(0, 4).join("/");
    }
  }
}

module.exports = DropboxPathProcessor;
