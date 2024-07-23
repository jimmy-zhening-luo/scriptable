"use strict";

(() => {
"use strict";

const inputUrl = args.shortcutParameter as string,
[__scheme, ...rest] = inputUrl.split(":") as Arrayful<string>,
_scheme = __scheme.toLowerCase(),
scheme = _scheme === "http" ? "https" : _scheme,
url = [scheme, ...rest].join(":");

if (url.length > 0)
  return { url, ...scheme === "https" ? { web: true } : {} };
else
  throw new TypeError(`No URL in input`);
})();
