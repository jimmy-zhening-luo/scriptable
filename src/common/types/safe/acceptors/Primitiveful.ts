function Primitiveful<
  P extends primitive,
  A extends string,
  SP extends
  & P
  & Safe<
    P,
    A
  >
  ,
>(
  acceptor: Acceptor<
    P,
    A,
    SP
  >,
  primitive: P,
  rejection: string,
  context?: string,
):
  & P
  & SP {
  if (
    acceptor(
      primitive,
    )
  )
    return primitive;
  else
    throw new TypeError(
      `primitiveful: ${
        rejection
      }`,
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
