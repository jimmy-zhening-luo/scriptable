// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./lib/share";

class FileLink extends Share<stringful> {
  protected readonly type = "fileURLs";

  protected runtime() {
    const { input: files = [] } = this,
    links = FileLink
      .stringfuls(files, "Shared Files")
      .map((path: stringful) => `shareddocuments://${encodeURI(path)}` as stringful)
      .join("\n") as stringful;

    Pasteboard.copyString(links);

    return links;
  }
}

new FileLink().run();
