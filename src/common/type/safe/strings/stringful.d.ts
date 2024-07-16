declare type stringful = Safe<string, "stringful"> & { 0: stringful & PropLength<1> };
