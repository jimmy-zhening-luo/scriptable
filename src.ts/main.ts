function hello(compiler: string): string {
  return (compiler?.constructor === String)?
    String(compiler)
    :String()
}



console.log(hello("TypeScript"));
  
export {}