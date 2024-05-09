declare type ThingsItem = {
  title: string;
  notes: string;
  triage: string;
  when?: "today" | "someday";
  list?: string;
};
declare type ThingsOutput = Record<"items", ThingsItem[]>;