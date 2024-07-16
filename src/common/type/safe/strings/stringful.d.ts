declare type stringful = Safe<string, "stringful"> & { 0: stringful & Lengthen<1> };
