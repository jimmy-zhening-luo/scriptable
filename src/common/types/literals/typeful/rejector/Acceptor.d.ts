declare type acceptor<Brand, T = string> = (literal: T)=> literal is T & Brand;
