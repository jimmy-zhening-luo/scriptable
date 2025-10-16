declare const finite: unique symbol;
declare type finite<N extends number = numberful> = N & { [finite]: true };
