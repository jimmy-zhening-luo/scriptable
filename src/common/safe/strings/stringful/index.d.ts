declare type stringful = Safe<string, "stringful"> & { 0: stringful & StringLength<1> };
