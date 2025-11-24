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
    : typeof e === "object"
      ? JSON.stringify(e)
      : String(e),
  root = trace.shift()!,
  stack = trace.map(print).join("\n"),
  header = print(root);

  console.error(stack);

  const notification = new Notification;

  notification.title = app;
  notification.subtitle = header;
  notification.body = stack;
  notification.sound = "failure";
  void notification.schedule();

  if (Error.isError(root)) {
    root.cause = stack;

    throw root;
  }

  throw Error(header, { cause: stack });
}
