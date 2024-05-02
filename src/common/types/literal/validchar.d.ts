declare const charset: unique symbol;
declare type ValidChar = char & { [charset]: "allowed" };
