import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

namespace _Distribution_Tool {

  export type AzCopyScriptVariables = {
    executablePath: string;
    sourcDistPath: string;
    blobStoreContainerUrl: string;
  }

  export function distribute(azCopyScriptVariables: AzCopyScriptVariables) {

    type AzCopyScripts = {
      clean: string;
      upload: string;
    }

    const script_ps_exec_clean: string = [
      `${azCopyScriptVariables.executablePath}`,
      `rm`,
      `"${azCopyScriptVariables.blobStoreContainerUrl}"`,
      `--recursive;`,
    ].join(" ");

    const script_ps_exec_upload: string = [
      `${azCopyScriptVariables.executablePath}`,
      `copy`,
      `"${azCopyScriptVariables.sourcDistPath}"`,
      `"${azCopyScriptVariables.blobStoreContainerUrl}"`,
      "--recursive;",
    ].join(" ");

    ps_exec({
      clean: script_ps_exec_clean,
      upload: script_ps_exec_upload,
    });

    function ps_exec(azCopyScripts: AzCopyScripts) {
      clean(azCopyScripts);
      function clean(azCopyScripts: AzCopyScripts) {
        exec(azCopyScripts.clean, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
          }
          console.log(`stdout: ${stdout}`);
          upload(azCopyScripts);
        });

        function upload(azCopyScripts: AzCopyScripts) {
          exec(azCopyScripts.upload, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            if (stderr) {
              console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
          });
        }
      }
    }
  }
}

const blobStoreContainerUrlTemplate: string = "https://<your-blob-store>.blob.core.windows.net/<your-container>";

const azCopyScriptVariables: _Distribution_Tool.AzCopyScriptVariables = {

  executablePath:
    process.env.PATH_AZCOPY_EXECUTABLE
    || "C:\\azcopy\\azcopy.exe",

  sourcDistPath:
    "dist",

  blobStoreContainerUrl:
    process.env.URL_AZURE_BLOB_STORE_CONTAINER
    || blobStoreContainerUrlTemplate,

}

if (azCopyScriptVariables.blobStoreContainerUrl === blobStoreContainerUrlTemplate)
  console.warn("npm run distribute: Canceled distribution because no environment variable was set for URL_AZURE_BLOB_STORE_CONTAINER. Check your deployment environment variables or your .env file.");
else
  _Distribution_Tool.distribute(azCopyScriptVariables);
