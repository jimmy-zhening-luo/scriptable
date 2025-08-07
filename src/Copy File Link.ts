// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./core/share";

class FileLink extends Share<string> {
  protected runtime() {
    return this
      .stringfuls(
        this.input ?? [],
        "No filepath to copy",
      )
      .map(path => "shareddocuments://" + encodeURI(path))
      .join("\n");
  }
}

void new FileLink("fileURLs").run();
