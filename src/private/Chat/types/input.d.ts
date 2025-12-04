import type IPrompt from "./prompt";

export interface Input extends Partial<IPrompt> {
  input: string;
  variables?: FieldTable;
}
