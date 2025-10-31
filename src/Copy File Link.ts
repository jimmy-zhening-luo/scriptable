"gray folder-open";
"file-url";
import Share from "./app/share";

void new class FileLink extends Share {
  protected runtime() {
    return this.input === undefined
      ? ""
      : this
          .input
          .map(
            path => "shareddocuments://" + encodeURI(path),
          )
          .join("\n");
  }
}("fileURLs").run();
