declare type Unflat<In, Readonly extends boolean = true> =
  | In
  | (Readonly extends true ? readonly In[] : In[])
;
