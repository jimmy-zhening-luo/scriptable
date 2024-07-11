declare type IsArray<Arr> = Flat<Arr> extends never
  ? Arr extends readonly []
    ? true
    : false
  : true;
