declare type ThingsItem = {
  title: string;
  notes: string;
  triage: string;
  list?: string;
  when?: "today" | "someday";
};
