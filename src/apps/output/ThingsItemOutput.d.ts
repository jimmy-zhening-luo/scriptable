declare type ThingsItemOutput = {
  title: string;
  notes: string;
  triage: string;
  when?: "today" | "someday";
  list?: string;
};
