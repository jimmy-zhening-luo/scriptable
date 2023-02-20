import { exec } from 'node:child_process';

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BLOB_STORAGE_URL) {
  console.error('BLOB_STORAGE_URL is not set');
}
else {
  exec(`azcopy copy 'dist' '${process.env.BLOB_STORAGE_URL}' --recursive`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

}
