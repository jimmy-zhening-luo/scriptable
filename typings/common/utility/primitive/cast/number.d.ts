declare type ToNumber<Value extends string> = literalful<Value> extends `${infer Number extends number}`
    ? Number 
    : never;
