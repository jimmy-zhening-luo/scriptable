const uc_ValidString = importModule(
  `./common/validators/base/string/valid/ValidString`,
) as typeof ValidString;

abstract class IUrlComponent<
  UC extends string,
> extends uc_ValidString<
    `UrlComponent:${
      literalful<UC>
    }`
  > {
  //
}

module.exports = IUrlComponent;
