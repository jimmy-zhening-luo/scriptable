import type Url from "../../app/lib/url";

export default function (host: Url["host"], path: string) {
  const processors = {
    "amazon.com": path => (([, pid = null]) => pid === null ? path : `/dp/${(pid.split("/") as Arrayful)[0]}`)(path.split("/dp/")),
    "dhl.com": path => path.endsWith("/tracking.html") ? "/tracking.html" : path.startsWith("/orders/") && path.includes("/details/") ? `/tracking.html?tracking-id=${path.split("/")[4] ?? ""}` : path,
    "dropbox.com": path => !path.startsWith("/scl/fi/") ? path : (nodes => nodes.length < 4 ? path : nodes.slice(0, 4).join("/"))(path.split("/")),
    "linkedin.com": path => path.startsWith("/mwlite/") ? path.slice(7) : path,
    "reddit.com": path => (nodes => nodes.length < 6 || nodes[3] !== "comments" ? path : nodes.slice(0, nodes[5] === "comment" ? 7 : 5).join("/"))(path.split("/")),
    "tools.usps.com": path => path.startsWith("/go/Track") ? "/go/TrackConfirmAction" : path,
  } satisfies Record<string, (path: string) => string> as Record<Url["host"], (path: string) => string>;

  return processors[host]?.(path) ?? path;
}
