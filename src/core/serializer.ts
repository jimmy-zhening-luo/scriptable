export default function (data: unknown) {
  switch (typeof data) {
  case "string":
    return data;
  case "object":
    return JSON.stringify(data);
  default:
    return String(data);
  }
}
