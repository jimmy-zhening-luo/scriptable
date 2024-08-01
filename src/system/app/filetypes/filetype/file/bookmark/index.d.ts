declare const bookmark: unique symbol;
declare type bookmark = stringful & filepath<readonly filenode[]> & { [bookmark]: true };
