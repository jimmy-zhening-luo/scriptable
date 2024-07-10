"use strict";

(() => {
  "use strict";

  const inputUrl = args
    .shortcutParameter as string;
  const [
    __scheme,
    ...rest
  ] = inputUrl
    .split(":") as Arrayful<string>;
  const _scheme = __scheme
    .toLowerCase();
  const scheme = _scheme === "http"
    ? "https"
    : _scheme;
  const url = [
    scheme,
    ...rest,
  ]
    .join(":");

  if (url.length > 0)
    return {
      url,
      ...scheme === "https"
        ? { web: true }
        : {},
    };
  else
    throw new TypeError(
      `No URL in input`,
    );
})();
