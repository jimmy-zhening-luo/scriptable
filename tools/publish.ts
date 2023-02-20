import * as shell from "shelljs";

const CLOUD_BUILD_PATH: string = "C:\\Users\\zluo\\iCloudDrive\\CloudBuilds\\Scriptable\\main\\dist";

shell.rm("-rf", CLOUD_BUILD_PATH);
shell.mkdir("-p", CLOUD_BUILD_PATH);
shell.cp("-R", "dist/*", CLOUD_BUILD_PATH);
