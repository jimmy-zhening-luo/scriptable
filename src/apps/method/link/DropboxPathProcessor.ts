const drop_ILinkPathProcessor = importModule(
  `processor/ILinkPathProcessor`,
) as typeof ILinkPathProcessor;

class DropboxPathProcessor extends drop_ILinkPathProcessor<
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
        const split = path
          .split(
            "/",
          );

        if (
          split
            .length < 4
        )
          return path;
        else {
          const [
            BLANK,
            SCL,
            FI,
            fileId,
          ] = split as ArrayN<
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
