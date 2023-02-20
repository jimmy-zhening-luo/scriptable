import * as shell from "shelljs";

shell.mkdir("dist");

let builtFileCounter: number = 0;
shell.ls("built").forEach((file) => {
  builtFileCounter++;
  shell.cp("-R", `built/${file}`, "dist");
});

if (builtFileCounter === 0)
  console.log("npm run pack: No built files found in './built'");

let distFileCounter: number = 0;
shell.ls("-R", "dist").forEach((file) => {
  distFileCounter++;
  if (
    file.endsWith(".d.ts")
    || file.endsWith(".d.ts.map")
    || file.endsWith(".js.map")
    || file.endsWith("tsconfig.tsbuildinfo")
  ) {
    shell.rm("-rf", `dist/${file}`);
  }
});

if (
  builtFileCounter !== 0
  && distFileCounter === 0
)
  console.log(`npm run pack: After copying ${builtFileCounter} built files to dist, no dist files were found in './dist'`);
  