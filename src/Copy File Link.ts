// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./lib/share";

class FileLink extends Share<
  string
> {
  protected readonly type = "fileURLs";
  
  protected runtime() {
    return "Hello World";
  }
}

new FileLink().run();
