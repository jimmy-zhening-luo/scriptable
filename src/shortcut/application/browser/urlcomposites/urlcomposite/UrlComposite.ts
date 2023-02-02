abstract class UrlComposite {
  abstract readonly parts: Array<UrlPart|UrlComposite>;
  abstract get composite(): string;

  get hasValue(): boolean {
    return this.composite !== "";
  }

  get string(): string {
    return this.composite;
  }

  toString(): string {
    return this.string;
  }
}

namespace UrlComposite {
  export const _UrlPart: typeof UrlPart = importModule("./shortcut/application/browser/urlcomposites/urlparts/urlpart/tsconfig.json");
}

module.exports = UrlComposite;
