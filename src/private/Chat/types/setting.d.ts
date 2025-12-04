import type IPrompt from "./prompt";

export interface Setting extends IPrompt {
  api: string;
  auth: Field<
    | "token"
    | "org"
  >;
  options: Table;
}
