const fr_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Fragment extends fr_UrlPart {
  protected parse(
    fragment: string
  ): null | string {
    return (
      fragment.trim() === "#"
      || fragment.trim() === ""
    ) ?
      null
      : new Fragment
        ._ValidFragment(fragment)
        .value;
  }
}

namespace Fragment {
  export const _ValidFragment: typeof ValidFragment = importModule("validators/ValidFragment");
}

module.exports = Fragment;
