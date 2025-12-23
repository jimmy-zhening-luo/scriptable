"cyan comments";
import Shortcut from "./app";
import Api from "./lib/api";
import Time from "./lib/time";
import location from "./lib/location";
import type {
  Setting,
  Input,
  Output,
  Response,
} from "./private/Chat";

await new class Chat extends Shortcut<
  Setting,
  Output,
  Input
> {
  protected async runtime() {
    const { setting, input } = this;

    if (!input?.input)
      return null;

    const api = new Api(
      setting.api,
      undefined,
      {
        "OpenAI-Organization": setting.auth.org,
      },
      setting.auth.token,
      "application/json",
    ),
    { prompt = setting.prompt } = input,
    { latitude, longitude } = await location(),
    now = new Time,
    { text, output } = await api.request<Response>(
      "POST",
      undefined,
      undefined,
      {
        input: input.input,
        prompt: {
          id: prompt.id,
          variables: {
            latlong: latitude + "," + longitude,
            date: now.print("y-MM-dd"),
            time: now.print("HH:mm:00ZZZZZ"),
            f_date: now.print("MMMM d, y"),
            f_time: now.print("h:mm a"),
            timezone: now.print("VV"),
            weekday: now.print("EEEE"),
            ...input.variables ?? {},
          },
        },
        ...setting.options,
      },
    ),
    payload = output.at(-1)!;

    if ("content" in payload) {
      const [{ text: message }] = payload.content,
      answer = text.format.schema
        ? (JSON.parse(message) as Table<primitive>)[prompt.answer!] ?? null
        : message;

        return answer || null;
          ? answer
          : answer || null;
    }

    return payload;
  }
}(2).run();
