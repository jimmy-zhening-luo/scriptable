declare const p: unique symbol;
declare type Safe<P extends primitive, Check> = P & { [p]: Check };
