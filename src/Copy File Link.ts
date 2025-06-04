// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./app/share";

class FileLink extends Share<string> {
  constructor() {
    super("fileURLs");
  }

  protected runtime() {
    return this
      .stringfuls(
        this.input ?? [],
        "No filepath to copy",
      )
      .map(
        path => "shareddocuments://" + encodeURI(path),
      )
      .join("\n");
  }
}

new FileLink().run();
