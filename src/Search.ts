// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search;
namespace Search {
  const shortcut: typeof Shortcut = importModule("shortcut/Shortcut");
  
  export class Search extends shortcut {
    runtime(): boolean {
      return false;
    }
  }
}

(new Search.Search())["run"]();
