import { exec } from 'child_process';
import dotenv from 'dotenv';

namespace _Distribution_Tool {

  export function distribute() {

    type AzCopyScriptVariables = {
      executablePath: string;
      sourcDistPath: string;
      blobStoreContainerUrl: string;
    }

    type AzCopyScripts = {
      clean: string;
      upload: string;
    }

    console.log(`${new Date().toTimeString()}: npm run distribute: Starting distribution...`)
    try {
      const azCopyScriptVariables: AzCopyScriptVariables = hydrateEnv();
      azure_clean_upload(azCopyScriptVariables);
    } catch (e) {
      console.error(`npm run distribute: Canceled job due to encountered error: ${e}`)
      throw e;
    }

    function hydrateEnv(): AzCopyScriptVariables {
      try {
        dotenv.config();
        const TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER: string = "https://<your-blob-store>.blob.core.windows.net/<your-container>";
        const azCopyScriptVariables: AzCopyScriptVariables = {
          executablePath: process.env.PATH_AZCOPY_EXECUTABLE
            || "C:\\azcopy\\azcopy.exe",
          sourcDistPath: "dist",
          blobStoreContainerUrl: process.env.URL_AZURE_BLOB_STORE_CONTAINER
            || TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER,
        };
        if (azCopyScriptVariables.blobStoreContainerUrl === TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER)
          throw new ReferenceError(`npm run distribute: hydrateEnv: Canceled distribution because no environment variable was set for URL_AZURE_BLOB_STORE_CONTAINER. Check your deployment environment variables or your .env file. See example URL_AZURE_BLOB_STORE_CONTAINER: ${TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER}`);
        return azCopyScriptVariables;
      } catch (e) {
        console.error(`npm run distribute: hydrateEnv: Error while loading environmental variables to specify where to distribute the packed files: ${e}`);
        throw e;
      }
    }

    function azure_clean_upload(azCopyScriptVariables: AzCopyScriptVariables) {
      const ps_exec_scripts: AzCopyScripts = {
        clean: [
          `${azCopyScriptVariables.executablePath}`,
          `rm`,
          `"${azCopyScriptVariables.blobStoreContainerUrl}"`,
          `--recursive;`,
        ].join(" "),
        upload: [
          `${azCopyScriptVariables.executablePath}`,
          `copy`,
          `"${azCopyScriptVariables.sourcDistPath}"`,
          `"${azCopyScriptVariables.blobStoreContainerUrl}"`,
          "--recursive;",
        ].join(" ")
      };

      try {
        ps_exec(
          ps_exec_scripts.clean,
          ps_exec_scripts.upload
        )
      } catch (e) {
        console.error(`npm run distribute: azure_clean_upload: Error while executing azcopy commands: ${e}`);
        throw e;
      }

      function ps_exec(azCopyScript: string, ...nextScript: string[]) {
        try {
          exec(azCopyScript, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            if (stderr) {
              throw new Error(stderr);
            }
            if (azCopySucceeded(stdout)) {
              console.log(`npm run distribute: azure_clean_upload: ps_exec: SUCCESS, Azure Storage Web API returned success.`)
              if (nextScript !== undefined && nextScript.length > 0)
                ps_exec(nextScript[0], ...nextScript.slice(1));
              else
                console.log(`${new Date().toTimeString()}: npm run distribute: Job completed successfully without errors.`);
            }
            else {
              console.log(`npm run distribute: azure_clean_upload: ps_exec: Completed with errors (partial success): ${stdout}`);
              if (nextScript !== undefined && nextScript.length > 0)
                ps_exec(nextScript[0], ...nextScript.slice(1));
              else
                console.log(`${new Date().toTimeString()}: npm run distribute: Job completed successfully without errors.`);

            }
          });
        } catch (e) {
          console.error(`npm run distribute: azure_clean_upload:ps_exec: Error while executing powershell: ${e}`);
          throw e;
        }
      }

      function azCopySucceeded(
        stdout: string,
      ): boolean {
        const successCriteriaOutputLines: string[] = [
          `Number of File Transfers Failed: 0`,
          `Number of Folder Transfers Skipped: 0`,
          `Number of File Transfers Skipped: 0`,
          `Number of Folder Transfers Skipped: 0`,
          `Final Job Status: Completed`
        ]
        return successCriteriaOutputLines.every(successOutputLIne => stdout.includes(successOutputLIne));
      }
    }
  }
}

_Distribution_Tool.distribute();
