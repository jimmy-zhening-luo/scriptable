function Primitiveful<A, P extends primitive>(
  acceptor: Acceptor<P, A>,
  primitive: P,
  rejection: string,
  context?: string,
): P & A {
  if (acceptor(primitive))
    return primitive;
  else
    throw new TypeError(
      `primitiveful: ${rejection}`,
      {
        cause: {
          primitive,
          rejection,
          context,
          acceptor,
        },
      },
    );
}

module.exports = Primitiveful;
