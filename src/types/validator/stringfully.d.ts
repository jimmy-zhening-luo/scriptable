declare type stringfully<And extends string> = full<string, "stringful", And> & { 0: char };
