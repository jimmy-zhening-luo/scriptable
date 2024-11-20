declare type Unflat<In = string, RO extends boolean = true> = [In] extends [never]
  ? never
  : In | (Truth<RO> extends never ? In[] : readonly In[]);
