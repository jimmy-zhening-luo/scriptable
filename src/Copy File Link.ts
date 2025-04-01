// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./app/share";

class FileLink extends Share<string> {
  protected readonly type = "fileURLs";

  protected runtime() {
    return this
      .stringfuls(this.input ?? [], "Input filepaths")
      .map(path => `shareddocuments://${encodeURI(path)}`)
      .join("\n");
  }
}

new FileLink().run();
