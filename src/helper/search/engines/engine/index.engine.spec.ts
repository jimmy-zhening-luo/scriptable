import SearchEngine from "./index.js";
import type Query from "../../query.js";

export default class TestEngine extends SearchEngine<"find"> {
  protected optional(query: Query) {
    return {
      reversed: [...query.natural]
        .reverse()
        .join(""),
    };
  }
}
