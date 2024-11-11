function Processor(host: string, path: string) {
  const processors = {
    "amazon.com": (path: string) => (([, pid = null]) => pid === null ? path : `/dp/${(pid.split("/") as Arrayful)[0]}`)(path.split("/dp/")),
    "dropbox.com": (path: string) => !path.startsWith("/scl/fi/") ? path : (nodes => nodes.length < 4 ? path : nodes.slice(0, 4).join("/"))(path.split("/")),
    "linkedin.com": (path: string) => path.startsWith("/mwlite/") ? path.slice(7) : path,
    "reddit.com": (path: string) => (nodes => nodes.length < 6 || nodes[3] !== "comments" ? path : nodes.slice(0, nodes[5] === "comment" ? 7 : 5).join("/"))(path.split("/")),
  } as const;

  return host in processors ? processors[host as keyof typeof processors](path) : path;
}

export default Processor;
