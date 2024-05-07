function typeful<Brand, T>(
  acceptor: acceptor<Brand, T>,
  literal: T,
  errorType: string,
  error?: string,
): Brand {
  if (acceptor(literal))
    return literal;
  else
    throw new TypeError(
      `Safe: ${errorType}`,
      {
        cause: {
          errorType,
          error,
        },
      },
    );
}

module.exports = typeful;
