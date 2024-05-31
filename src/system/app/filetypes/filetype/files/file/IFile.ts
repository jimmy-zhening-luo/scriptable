abstract class IFile {
  protected readonly __proto: literalful<
    "IFile"
  > = "IFile";
  protected readonly manager = FileManager
    .iCloud();
  private readonly _root: rootpath;
  private _subpath: Subpath;

  constructor(
    root:
      | IFile
      | Bookmark
      | {
        file: IFile;
        rootOnly: boolean;
      }
      | ConstructorParameters<typeof IFilepath>[0],
    ...subpaths: ConstructorParameters<typeof IFilepath>
  ) {
    try {
      this
        ._root =
        root instanceof IFile
        || root instanceof this
          .Bookmark
          ? root
            .path
          : typeof root === "object"
          && "file" in root
          && "rootOnly" in root
            ? root
              .rootOnly
              ? root
                .file
                ._root
              : root
                .file
                .path
            : new this
              .Rootpath(
                root,
              )
              .toString();
      this
        ._subpath = new this
          .Subpath(
            ...subpaths,
          );
    }
    catch (e) {
      throw new EvalError(
        `IFile: ctor`,
        { cause: e },
      );
    }
  }

  public get path(): rootpath {
    try {
      return this
        ._subpath
        .prepend(
          this
            ._root,
        );
    }
    catch (e) {
      throw new EvalError(
        `IFile: path`,
        { cause: e },
      );
    }
  }

  public get subpath(): subpath {
    try {
      return this
        ._subpath
        .toString();
    }
    catch (e) {
      throw new EvalError(
        `IFile: subpath`,
        { cause: e },
      );
    }
  }

  public get exists() {
    try {
      return this.isFile
        || this.isDirectory;
    }
    catch (e) {
      throw new EvalError(
        `IFile: exists`,
        { cause: e },
      );
    }
  }

  public get isFile() {
    try {
      return this
        .manager
        .fileExists(
          this
            .path,
        )
        && !this.isDirectory;
    }
    catch (e) {
      throw new EvalError(
        `IFile: isFile`,
        { cause: e },
      );
    }
  }

  public get isDirectory() {
    try {
      return this
        .manager
        .isDirectory(
          this
            .path,
        );
    }
    catch (e) {
      throw new EvalError(
        `IFile: isDirectory`,
        { cause: e },
      );
    }
  }

  public get isRoot() {
    try {
      return this
        ._subpath
        .isEmpty;
    }
    catch (e) {
      throw new EvalError(
        `IFile: isRoot`,
        { cause: e },
      );
    }
  }

  public get isLeaf() {
    try {
      return (
        !this.exists
        || this.isFile
        || this.isDirectory
        && this
          .ls
          .length === 0
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: isLeaf`,
        { cause: e },
      );
    }
  }

  public get root(): this {
    try {
      return new (
        this.constructor as new (
          ...args: ConstructorParameters<typeof IFile>
        )=> this
      )(
        {
          file: this,
          rootOnly: true,
        },
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: root`,
        { cause: e },
      );
    }
  }

  public get parent(): this {
    try {
      return new (
        this.constructor as new (
          ...args: ConstructorParameters<typeof IFile>
        )=> this
      )(
        this
          .root,
        this
          ._subpath
          .parent,
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: parent`,
        { cause: e },
      );
    }
  }

  public get ls() {
    try {
      return this
        .isDirectory
        ? this
          .manager
          .listContents(
            this
              .path,
          )
        : [];
    }
    catch (e) {
      throw new EvalError(
        `IFile: ls`,
        { cause: e },
      );
    }
  }

  public get descendants(): this[] {
    try {
      return this
        .isFile
        ? [this]
        : this
          .isLeaf
          ? []
          : this
            .ls
            .map(
              filename =>
                this
                  .append(
                    filename,
                  ),
            )
            .filter(
              child =>
                !this
                  .path
                  .startsWith(
                    child
                      .path,
                  ),
            )
            .map(
              file =>
                file
                  .descendants,
            )
            .flat(
              1,
            );
    }
    catch (e) {
      throw new EvalError(
        `IFile: descendants`,
        { cause: e },
      );
    }
  }

  private get Bookmark() {
    try {
      return importModule(
        "bookmark/Bookmark",
      ) as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Bookmark`,
        { cause: e },
      );
    }
  }

  private get Rootpath() {
    try {
      return importModule(
        "./common/validators/impl/filepaths/Rootpath",
      ) as typeof Rootpath;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Rootpath`,
        { cause: e },
      );
    }
  }

  private get Subpath() {
    try {
      return importModule(
        "./common/validators/impl/filepaths/Subpath",
      ) as typeof Subpath;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Subpath`,
        { cause: e },
      );
    }
  }

  public set subpath(
    subpath: ConstructorParameters<typeof IFilepath>[1],
  ) {
    try {
      this
        ._subpath = new this
          .Subpath(
            subpath,
          );
    }
    catch (e) {
      throw new EvalError(
        `IFile: subpath`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown) {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && (instance as { __proto: string }).__proto === "IFile"
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public append(
    ...filepaths: Parameters<IFilepath<false>["append"]>
  ) {
    try {
      return new (
        this.constructor as new (
          ...args: ConstructorParameters<typeof IFile>
        )=> this
      )(
        this,
        this
          ._subpath
          .append(
            ...filepaths,
          ),
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: append`,
        { cause: e },
      );
    }
  }

  public cd(
    ...relativeFilepath: Parameters<IFilepath<false>["cd"]>
  ) {
    try {
      this
        ._subpath
        .cd(
          ...relativeFilepath,
        );

      return this;
    }
    catch (e) {
      throw new EvalError(
        `IFile: cd`,
        { cause: e },
      );
    }
  }

  public read(
    error = false,
  ) {
    try {
      if (
        !this
          .isFile
      )
        if (
          error
        )
          throw new ReferenceError(
            `file does not exist`,
          );
        else
          return "";
      else
        return this
          .manager
          .readString(
            this
              .path,
          );
    }
    catch (e) {
      throw new EvalError(
        `IFile: read: ${
          this
            .path
        }`,
        { cause: e },
      );
    }
  }

  public readful(
    errorLabel: string = "",
  ): stringful {
    try {
      const read = this
        .read(
          true,
        );

      if (
        read
          .length > 0
      )
        return read as stringful;
      else
        throw new TypeError(
          `file empty`,
          { cause: { errorLabel } },
        );
    }
    catch (e) {
      throw new EvalError(
        `IFile: readful: ${
          this
            .path
        }`,
        { cause: e },
      );
    }
  }

  public write(
    string: string,
    overwrite:
      | "line"
      | "append"
      | boolean = false
    ,
  ) {
    try {
      if (
        this
          .isDirectory
      )
        throw new ReferenceError(
          `path is folder`,
        );
      else
        if (
          this
            .isFile
        )
          if (
            overwrite === false
          )
            throw new TypeError(
              `file exists & overwrite false`,
            );
          else
            this
              .manager
              .writeString(
                this
                  .path,
                overwrite === "append"
                  ? `${
                    this
                      .read()
                  }${
                    string
                  }`
                  : overwrite === "line"
                    ? `${
                      string
                    }\n${
                      this
                        .read()
                    }`
                    : string,
              );
        else {
          if (
            !this
              .parent
              .isDirectory
          )
            this
              .manager
              .createDirectory(
                this
                  .parent
                  .path,
                true,
              );

          this
            .manager
            .writeString(
              this
                .path,
              string,
            );
        }
    }
    catch (e) {
      throw new EvalError(
        `IFile: write: ${
          this
            .path
        }`,
        { cause: e },
      );
    }
  }

  public async delete(
    force = false,
  ) {
    try {
      if (
        this
          .exists
      )
        if (
          force
        )
          this
            .manager
            .remove(
              this
                .path,
            );
        else {
          const alert = new Alert();

          alert
            .message = `Permanently delete?\n${
              this
                .path
            }`;
          alert
            .addDestructiveAction(
              "DELETE",
            );
          alert
            .addCancelAction(
              "Cancel",
            );
          await alert
            .present()
            .then(
              userChoice => {
                userChoice === 0
                  ? this
                    .manager
                    .remove(
                      this
                        .path,
                    )
                  : console
                    .warn(
                      `Canceled by user, did NOT delete:\n${
                        this
                          .path
                      }`,
                    );
              },
            );
        }
    }
    catch (e) {
      throw new EvalError(
        `IFile: delete: ${
          this
            .path
        }`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return this
        .path;
    }
    catch (e) {
      throw new EvalError(
        `IFile: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = IFile;
