declare type Restring<Record> = {
  [Key in keyof Record]: string;
};
