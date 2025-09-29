// icon-color: gray; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
import Share from "./app/share";

void new class FileLink extends Share<string> {
  protected runtime() {
    return this.context.production
      ? this
          .stringfuls(
            this.input ?? [],
            "No filepath to copy",
          )
          .map(
            path => "shareddocuments://"
              .concat(
                encodeURI(path),
              ),
          )
          .join("\n")
      : "";
  }
}("fileURLs").run();
