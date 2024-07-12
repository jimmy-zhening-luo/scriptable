declare type Unflat<I = string, Readonly extends boolean = true> = I | (Readonly extends true ? readonly I[] : I[])
;
