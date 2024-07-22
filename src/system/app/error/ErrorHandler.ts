class ErrorHandler {
  public handle(top: Error) {
    try {
      const queue: ErrorLike[] = [top];

      for (
        let i: ErrorLike = top;
        typeof i === "object" && "cause" in i;
        i = i.cause as ErrorLike
      )
        queue.unshift(i.cause as ErrorLike);

      const hoist = queue
          .findIndex((error): error is ErrorLike<true> => typeof error === "object" && "message" in error),
        hoistedQueue: readonly ErrorLike[] = hoist > -1
          ? [
              queue[hoist] as ErrorLike<true>,
              ...queue.slice(
                0,
                hoist,
              ),
              ...queue.slice(hoist + 1),
            ]
          : queue,
        messages = hoistedQueue.map(error => this.print(error));

      console.error(messages.join("\n"));
      this.notify(messages);

      return messages.shift() ?? "";
    }
    catch (e) {
      throw new Error(
        `ErrorHandler: handle`,
        { cause: e },
      );
    }
  }

  private notify(messages: readonly string[]) {
    try {
      const notif = new Notification,
        lines = [...messages];

      notif.title = lines.shift() ?? "";
      notif.body = lines.join("\n");
      notif.sound = "failure";
      notif
        .schedule()
        .catch(
          (e: unknown) => {
            throw new Error(
              `Scriptable notification failed`,
              { cause: e },
            );
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: notify`,
        { cause: e },
      );
    }
  }

  private print(error: ErrorLike) {
    try {
      return typeof error === "object" && "message" in error
        ? error.message
        : this.quotelessStringify(error);
    }
    catch (e) {
      throw new SyntaxError(
        `ErrorHandler: print`,
        { cause: e },
      );
    }
  }

  private quotelessStringify(error: unknown): string {
    try {
      return Array.isArray(error)
        ? `[${error.map((vi: unknown) => this.quotelessStringify(vi)).join(", ")}]`
        : typeof error === "object" && error !== null
          ? Object
            .keys(error)
            .map(k => `${k}: ${this.quotelessStringify((error as FieldTable)[k])}`)
            .join(", ")
          : String(error);
    }
    catch (e) {
      throw new SyntaxError(
        `ErrorHandler: quotelessStringify`,
        { cause: e },
      );
    }
  }
}

module.exports = ErrorHandler;
