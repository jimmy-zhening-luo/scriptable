import type ILinkPathProcessor from "./processor/ILinkPathProcessor.js";

const iLinkPathProcessor = importModule(
  `processor/ILinkPathProcessor`,
) as typeof ILinkPathProcessor;

export default class DropboxPathProcessor extends iLinkPathProcessor<
  "dropbox.com"
> {
  protected process(
    path: string,
  ) {
    try {
      if (
        !path
          .startsWith(
            "/scl/fi/",
          )
      )
        return path;
      else {
        const nodes = path
          .split(
            "/",
          );

        if (
          nodes
            .length < 4
        )
          return path;
        else {
          const [
            BLANK,
            SCL,
            FI,
            fileId,
          ] = nodes as ArrayN<
            string
            ,
            4
          >;

          return [
            BLANK,
            SCL,
            FI,
            fileId,
          ]
            .join(
              "/",
            );
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `DropboxPathProcessor: process`,
        { cause: e },
      );
    }
  }
}
module.exports = DropboxPathProcessor;
