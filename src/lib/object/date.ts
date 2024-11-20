export default function ({
  date = "MMMM d, y",
  time = "h:mm:ss a",
  separator = " ",
  when = new Date,
} = {}) {
  const d = new DateFormatter;

  d.dateFormat = `${date}${separator}${time}`;

  return d.string(when);
}
