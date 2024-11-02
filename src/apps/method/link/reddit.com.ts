import Processor from "./processor";

class RedditProcessor extends Processor {
  protected process(path: string) {
    const nodes = path.split("/");

    return nodes.length < 6 || nodes[3] !== "comments"
      ? path
      : nodes
        .slice(0, nodes[5] === "comment" ? 7 : 5)
        .join("/");
  }
}

export default RedditProcessor;
