// icon-color: blue; icon-glyph: search;
import Shortcut from "./app";
import Query from "./private/method/search/query";
import Engine from "./private/method/search/engine";
import type {
  SearchOutput,
  SearchSetting,
} from "./private/interface/Search";

class Search extends Shortcut<
  string,
  SearchOutput,
  SearchSetting
> {
  protected override stringInput = true;

  protected runtime() {
    const { input = "" } = this,
    {
      key,
      terms,
      question,
      recomposed,
    } = Query(
      input === ""
        ? this.read()
        : input,
      this.setting.alias,
      new Set<string>(
        Object.keys(this.setting.engines),
      ),
      this.stringfuls(this.setting.fallbacks),
      this.stringful(
        this.setting.reserved.operators,
      ),
      this.chars(
        this.setting.reserved.selectors,
      ),
    ),
    entry = this.setting.engines[key]!,
    engine = Array.isArray(entry)
      || typeof entry === "string"
      ? new Engine(
        "browser",
        entry,
        this.stringful(
          this.setting.reserved.tag,
        ),
      )
      : "url" in entry
        ? new Engine(
          "browser",
          entry.url,
          this.stringful(
            this.setting.reserved.tag,
          ),
          entry.separator,
          entry.force,
        )
        : new Engine(
          "shortcut",
          (entry.shortcut as Undef<string>)
          ?? "",
          entry.notify,
        );

    this.write(recomposed);

    return engine.resolve(
      key,
      terms,
      question,
    );
  }
}

new Search().run();
