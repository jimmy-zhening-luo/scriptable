import { exec } from "child_process";
import dotenv from "dotenv";

namespace _Distribution_Tool {
  export function distribute(): void {
    console.log(
      `${new Date().toTimeString()}: npm run distribute: Starting distribution...`,
    );
    try {
      _az_clean_upload(_hydrateEnv());
    } catch (e) {
      e = new Error(
        `npm run distribute: Canceled job due to encountered error: ${e}`,
      );
      console.error(e);
      throw e;
    }

    function _hydrateEnv(): AzCopyScriptVariables {
      try {
        dotenv.config();
        const TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER =
          "https://<your-blob-store>.blob.core.windows.net/<your-container>";
        const azCopyScriptVariables: AzCopyScriptVariables = {
          executablePath:
            process.env.PATH_AZCOPY_EXECUTABLE ?? "C:\\azcopy\\azcopy.exe",
          sourceDistPath: "dist",
          blobStoreContainerUrl:
            process.env.URL_AZURE_BLOB_STORE_CONTAINER ??
            TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER,
        };
        if (
          azCopyScriptVariables.blobStoreContainerUrl ===
          TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER
        )
          throw new ReferenceError(
            `Canceling deployment because failed to hydrate env: no environment variable was set for URL_AZURE_BLOB_STORE_CONTAINER. Check your deployment environment variables or your .env file. See example URL_AZURE_BLOB_STORE_CONTAINER: ${TEMPLATE_EXAMPLE_URL_BLOBSTORE_CONTAINER}`,
          );
        return azCopyScriptVariables;
      } catch (e) {
        throw new ReferenceError(
          `npm run distribute: hydrateEnv: Error while loading environmental variables to specify where to distribute the packed files: ${e}`,
        );
      }
    }

    function _az_clean_upload(
      azCopyScriptVariables: AzCopyScriptVariables,
    ): void {
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
          `"${azCopyScriptVariables.sourceDistPath}"`,
          `"${azCopyScriptVariables.blobStoreContainerUrl}"`,
          "--recursive;",
        ].join(" "),
      };

      try {
        _ps_exec(ps_exec_scripts.clean, ps_exec_scripts.upload);
      } catch (e) {
        throw new Error(
          `npm run distribute: azure_clean_upload: Error while executing azcopy commands: ${e}`,
        );
      }

      function _ps_exec(azCopyScript: string, ...nextScript: string[]): void {
        try {
          exec(
            azCopyScript,
            {
              shell: "powershell.exe",
            },
            (error, stdout, stderr) => {
              if (error) throw error;
              if (stderr) throw new Error(stderr);
              if (_azCopySucceeded(stdout))
                console.log(
                  `npm run distribute: azure_clean_upload: ps_exec: SUCCESS`,
                );
              else
                console.warn(
                  `_ps_exec: PARTIAL SUCCESS: Completed current script with errors: ${stdout}`,
                );
              if (nextScript.length > 0 && nextScript[0] !== undefined)
                _ps_exec(nextScript[0], ...nextScript.slice(1));
              else
                console.log(
                  `${new Date().toTimeString()}: npm run distribute: Job completed (check logging above for any partial completions or errors).`,
                );
            },
          );
        } catch (e) {
          throw new Error(`_ps_exec: Error while executing powershell: ${e}`);
        }
      }

      function _azCopySucceeded(stdout: string): boolean {
        const successCriteriaOutputLines: string[] = [
          `Number of File Transfers Failed: 0`,
          `Number of Folder Transfers Skipped: 0`,
          `Number of File Transfers Skipped: 0`,
          `Number of Folder Transfers Skipped: 0`,
          `Final Job Status: Completed`,
        ];
        return successCriteriaOutputLines.every(successOutputLine =>
          stdout.includes(successOutputLine),
        );
      }
    }
  }

  export type AzCopyScriptVariables = {
    executablePath: string;
    sourceDistPath: string;
    blobStoreContainerUrl: string;
  };

  export type AzCopyScripts = {
    clean: string;
    upload: string;
  };
}

_Distribution_Tool.distribute();
