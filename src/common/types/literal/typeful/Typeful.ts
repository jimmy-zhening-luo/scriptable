function typeful<Brand, T>(
  acceptor: acceptor<Brand, T>,
  literal: T,
  errorType: string,
  errorContext?: string,
): Brand {
  if (acceptor(literal))
    return literal;
  else
    throw new TypeError(
      `Safe: ${errorType}${
        errorContext === undefined
          ? ""
          : `: ${errorContext}`
      }`,
    );
}

module.exports = typeful;
