"light-gray folder-open";
"file-url";
import Share from "./app/share";

void new class FileLink extends Share {
  protected runtime() {
    return this.input
      ?.map(encodeURI)
      ?.map(path => "shareddocuments://" + path)
      ?.join("\n")
      ?? "";
  }
}("fileURLs").run();
