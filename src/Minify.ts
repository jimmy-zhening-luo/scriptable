"teal magic";
"file-url";
import Share from "./app/share";

void new class Minify extends Share {
  protected runtime() {
    const file = this.input?.[0];

    return file === undefined
      ? ""
      : JSON.stringify(
        JSON.parse(
          FileManager
            .iCloud()
            .readString(file),
        ),
      );
  }
}("fileURLs").run();
