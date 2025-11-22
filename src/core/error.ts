export default function (
  app: string,
  error: unknown,
) {
  const trace = [error];

  while (Error.isError(trace[0]))
    void trace.unshift(trace[0].cause);

  const rootIndex = trace.findIndex(
    e => Error.isError(e),
  );

  if (rootIndex > 0)
    void trace.unshift(
      (trace.splice(rootIndex, 1) as [Error])[0],
    );

  const print = (e: unknown) => Error.isError(e)
    ? e.name === "Error"
      ? e.message
      : String(e)
    : e && typeof e === "object"
      ? JSON.stringify(e)
      : String(e),
  root = trace.shift()!,
  stack = trace.map(print).join("\n"),

  let rootTitle = print(root);

  if (Error.isError(root)) {
    const source = root.stack
      ?.split("\n")
      .find(frame => frame.length > 1)
      ?.slice(0, -1);

    if (source && source !== "runtime")
      rootTitle = source + ": " + rootTitle;
  }

  const notification = new Notification;

  notification.title = app;
  notification.subtitle = rootTitle;
  notification.body = stack;
  notification.sound = "failure";
  void notification.schedule();
  console.error(stack);

  if (Error.isError(root)) {
    root.cause = stack;

    throw root;
  }

  throw Error(rootTitle, { cause: stack });
}
