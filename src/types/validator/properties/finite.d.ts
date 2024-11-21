declare const finite: unique symbol;
declare type finite<NumberType extends number = numberful> = NumberType & { [finite]: true };
