import type { QueryArgument } from "./argument";

export { QueryArgument } from "./argument";

export class SearchKey<
  Key extends string,
  Reserved extends (Key extends stringful ? true: false),
> {
  constructor(
    public readonly key: Key,
    public readonly reserved?: Reserved,
    public readonly argument?: Null<QueryArgument>,
  ) {}
}
