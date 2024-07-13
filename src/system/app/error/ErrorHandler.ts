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

      const hoist = queue.findIndex(
        (error): error is ErrorLike<true> =>
          typeof error === "object" && "message" in error,
      );
      const hoistedQueue: readonly ErrorLike[] = hoist > -1
        ? [
            queue[hoist] as ErrorLike<true>,
            ...queue.slice(
              0,
              hoist,
            ),
            ...queue.slice(hoist + 1),
          ]
        : queue;
      const messages = hoistedQueue
        .map(
          error =>
            this.print(error),
        );

      this.log(messages);
      this.notify(messages);

      return messages.shift() ?? "";
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: handle`,
        { cause: e },
      );
    }
  }

  private log(messages: readonly string[]) {
    try {
      console.error(messages.join("\n"));
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: log`,
        { cause: e },
      );
    }
  }

  private notify(messages: readonly string[]) {
    try {
      const note = new Notification();
      const lines = [...messages];

      note.title = lines.shift() ?? "";
      note.body = lines.join("\n");
      note.sound = "failure";
      note
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
      throw new EvalError(
        `ErrorHandler: print`,
        { cause: e },
      );
    }
  }

  private quotelessStringify(error: unknown): string {
    try {
      return Array.isArray(error)
        ? `[${
          error
            .map(
              (vi: unknown) =>
                this.quotelessStringify(vi),
            )
            .join(", ")
        }]`
        : typeof error === "object" && error !== null
          ? Object
            .keys(error)
            .map(
              k =>
                `${k}: ${this.quotelessStringify((error as FieldTable)[k])}`,
            )
            .join(", ")
          : String(error);
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: quotelessStringify`,
        { cause: e },
      );
    }
  }
}

module.exports = ErrorHandler;