declare type Unflat<I = string, Readonly extends boolean = true> = I | (Readonly extends false ? I[] : readonly I[]);
