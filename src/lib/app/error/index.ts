function error(error: unknown) {
  const stringify = (e: unknown): string => typeof e === "object" && e !== null
    ? Array.isArray(e)
      ? `[${e.map(i => stringify(i)).join(", ")}]`
      : `{ ${Object.entries(e).map(([k, v]) => `${k}: ${stringify(v)}`).join(", ")} }`
    : String(e),
  errors = [error] as Arrayful<unknown>;

  while (typeof errors[0] === "object" && errors[0] !== null && "cause" in errors[0])
    errors.unshift(errors[0].cause ?? "null");

  const messages = errors.map(
    e => typeof e === "object" && "message" in e
      ? e.message
      : stringify(e),
  ) satisfies string[] as Arrayful,
  [title, ...rest] = messages,
  body = rest.join("\n"),
  n = new Notification;

  logError(`${title}\n${body}`);
  n.title = title;
  n.body = body;
  n.sound = "failure";
  n.schedule().catch((e: unknown) => logError(e));

  return error;
}

module.exports = error;
export type error = typeof error;
