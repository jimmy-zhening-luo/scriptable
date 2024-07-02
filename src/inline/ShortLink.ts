export function MenuObj() {
  "use strict";

  const inputUrl = args
    .shortcutParameter as string;
  const [
    Scheme,
    ...rest,
  ] = inputUrl
    .split(
      ":",
    ) as Arrayful<
      string
    >;
  const scheme = Scheme
    .toLowerCase() === "http"
    ? "https"
    : Schene
      .toLowerCase();
  const url = [
    scheme,
    ...rest,
  ]
    .join(
      ":",
    );
  if (
    url
      .length > 0
  )
    return {
      url,
      web: scheme === "https",
    };
  else
    throw new TypeError(
      `No URL in input`,
    );
}
