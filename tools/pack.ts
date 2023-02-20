import * as shell from "shelljs";

shell.mkdir("dist");

shell.ls("built").forEach((file) => {
  shell.cp("-R", `built/${file}`, "dist");
});

shell.ls("-R", "dist").forEach((file) => {
  if (
    file.endsWith(".d.ts")
    || file.endsWith(".d.ts.map")
    || file.endsWith(".js.map")
    || file.endsWith("tsconfig.tsbuildinfo")
  )
    shell.rm("-rf", `dist/${file}`);
});
