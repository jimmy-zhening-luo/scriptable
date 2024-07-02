import type ILinkPathProcessor from "./processor/ILinkPathProcessor.js";

const iLinkPathProcessor = importModule(
  `processor/ILinkPathProcessor`,
) as typeof ILinkPathProcessor;

export default class RedditPathProcessor extends iLinkPathProcessor<
  "reddit.com"
> {
  protected process(
    path: string,
  ) {
    try {
      const nodes = path
        .split(
          "/",
        );

      return nodes
        .length < 6
        ? path
        : (nodes[3] ?? "") !== "comments"
            ? path
            : nodes
              .slice(
                0,
                nodes
                  .length < 7
                  ? 5
                  : (nodes[5] ?? "") !== "comment"
                      ? Infinity
                      : 7,
              )
              .join(
                "/",
              );
    }
    catch (e) {
      throw new EvalError(
        `RedditPathProcessor: process`,
        { cause: e },
      );
    }
  }
}
module.exports = RedditPathProcessor;
