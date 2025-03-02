// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./lib/share";

class FileLink extends Share<stringful> {
  protected readonly type = "fileURLs";

  protected runtime() {
    return FileLink
      .stringfuls(this.input ?? [], "Shared Files")
      .map((path: stringful) => `shareddocuments://${encodeURI(path)}` as stringful)
      .join("\n") as stringful;
  }
}

new FileLink().run();
