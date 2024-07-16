declare type ArrayLength<A extends readonly unknown[]> = Length<Arrayed<A>["length"]>;
