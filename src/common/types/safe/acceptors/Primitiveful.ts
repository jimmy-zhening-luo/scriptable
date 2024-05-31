function Primitiveful<
  Primitive extends primitive,
  Condition,
  SafePrimitive extends
  & Primitive
  & Safe<
    Primitive
    ,
    Condition
  >
  ,
>(
  acceptor: Acceptor<
    Primitive,
    Condition,
    SafePrimitive
  >,
  primitive: Primitive,
  rejection: string,
  context?: string,
):
  & Primitive
  & SafePrimitive {
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
