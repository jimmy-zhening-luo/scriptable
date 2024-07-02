const redd_ILinkPathProcessor = importModule(
  `processor/ILinkPathProcessor`,
) as typeof ILinkPathProcessor;

class RedditPathProcessor extends redd_ILinkPathProcessor<
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
        : nodes[3] as string !== "comments"
          ? path
          : nodes
            .slice(
              0,
              nodes
                .length < 7
                ? 5
                : nodes[5] as string !== "comment"
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
