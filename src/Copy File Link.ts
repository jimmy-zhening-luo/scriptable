// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./lib/share";

class FileLink extends Share<
  string
> {
  protected readonly type = "fileURLs";

  protected runtime() {
    const { input: files = [] as string[] } = this;
    
    if (files.length < 1)
      throw new RangeError("No folders/files shared");

    const links = files.map(path => `shareddocuments://${path}`).join("\n");

    Pasteboard.copyString(links);
    return links;
  }
}

new FileLink().run();
