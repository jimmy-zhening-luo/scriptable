const drop_ILinkPathProcessor = importModule<typeof LinkPathProcessor>(`processor/index`);

class DropboxPathProcessor extends drop_ILinkPathProcessor<"dropbox.com"> {
  protected process(path: string) {
    if (!path.startsWith("/scl/fi/"))
      return path;
    else {
      const nodes = path.split("/");

      if (nodes.length < 4)
        return path;
      else {
        const [
          BLANK,
          SCL,
          FI,
          fileId,
        ] = nodes as ArrayN<string, 4>;

        return [
          BLANK,
          SCL,
          FI,
          fileId,
        ].join("/");
      }
    }
  }
}

module.exports = DropboxPathProcessor;
