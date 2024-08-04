import type { LinkPathProcessor } from "./processor/index";

const redd_ILinkPathProcessor = importModule<typeof LinkPathProcessor>("./processor/index");

class RedditPathProcessor extends redd_ILinkPathProcessor<"reddit.com"> {
  protected process(path: string) {
    const nodes = path.split("/");

    return nodes.length < 6 ? path : (nodes[3] ?? "") !== "comments" ? path : nodes.slice(0, nodes.length < 7 ? 5 : (nodes[5] ?? "") !== "comment" ? Infinity : 7).join("/");
  }
}

module.exports = RedditPathProcessor;
