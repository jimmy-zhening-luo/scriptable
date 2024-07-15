declare type Unflat<In = string, RO extends boolean = true> =
  | In
  | (True<RO> extends never ? In[] : readonly In[])
;
