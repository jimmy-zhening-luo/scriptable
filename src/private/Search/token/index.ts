import type { QueryArgument } from "./argument";

export { QueryArgument } from "./argument";

export interface SearchKey<
  Key extends string,
  Reserved extends (Key extends stringful ? false : true),
> {
  readonly key: Key,
  readonly reserved?: Reserved,
  readonly argument?: QueryArgument,
}
