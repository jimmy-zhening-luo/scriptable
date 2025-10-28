"gray folder-open";
"file-url";
import Share from "./app/share";

void new class FileLink extends Share {
  protected runtime() {
    return this.context.production
      ? this
          .stringfuls(
            this.input ?? [],
            "No filepath to copy",
          )
          .map(
            path => "shareddocuments://" + encodeURI(path),
          )
          .join("\n")
      : "";
  }
}("fileURLs").run();
