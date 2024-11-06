function error(app: string, error: unknown) {
  const string = (e: unknown): string => typeof e === "object" && e !== null
    ? Array.isArray(e)
      ? `[${e.map(i => string(i)).join(", ")}]`
      : `{ ${Object.entries(e)
        .map(([k, v]) => `${k}: ${string(v)}`)
        .join(", ")} }`
    : String(e),
  cast = (e: unknown) => typeof e === "object" && e !== null && "message" in e ? e as Error : string(e),
  errors = [cast(error)] as Arrayful<Error | string>;

  while (typeof errors[0] !== "string" && "cause" in errors[0])
    errors.unshift(cast(errors[0].cause));

  const [title, body] = (([head, ...rest]) => [`${app}: ${head}`, rest.join("\n")])(errors.map(e => typeof e === "string" ? e : e.message) as Arrayful);

  logError(`${title}\n${body}`);

  const n = new Notification;

  n.title = title;
  n.body = body;
  n.schedule().catch((e: unknown) => logError(e));

  return new Error(title, { cause: body });
}

export default error;
