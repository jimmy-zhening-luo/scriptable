export default function ({
  date = "MMMM d, y",
  time = "h:mm:ss a",
  separator = " ",
  on = new Date,
} = {}) {
  const d = new DateFormatter;

  d.dateFormat = [date, time].join(separator);

  return d.string(on);
}
