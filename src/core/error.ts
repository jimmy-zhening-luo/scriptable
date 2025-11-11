export default function(
  app: string,
  error: unknown,
) {
  function cast(error: unknown) {
    return Error.isError(error)
      ? error
      : typeof error === "object"
        && error !== null
        ? JSON.stringify(error)
        : String(error);
  }

  const trace = [cast(error)];

  while (Error.isError(trace[0]))
    void trace.unshift(cast(trace[0].cause));

  const rootIndex = trace.findIndex(error => Error.isError(error));

  if (rootIndex > 0) {
    const [root] = trace.splice(rootIndex, 1) as [Error],
    source = root.stack?.split("\n")[1];

    if (source !== undefined)
      void trace.unshift(source);

    void trace.unshift(root);
  }

  function print(error: Error | string) {
    return Error.isError(error)
      ? error.name === "Error"
        ? error.message
        : String(error)
      : error;
  }

  const failure = trace.shift()!,
  stack = trace
    .map(print)
    .join("\n"),
  notification = new Notification;

  notification.title = app;
  notification.subtitle = print(failure);
  notification.body = stack;
  notification.sound = "failure";
  void notification.schedule();
  console.error(stack);

  if (Error.isError(failure)) {
    failure.cause = stack;

    throw failure;
  }

  throw Error(failure, { cause: stack });
}
