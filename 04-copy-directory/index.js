const fs = require('fs');
const path = require('path');


async function copyFiles() {
  await  fs.promises.rm(path.resolve(__dirname, 'files-copy'),{ recursive: true, force:true });
  await  fs.promises.mkdir(path.resolve(__dirname, 'files-copy'),{ recursive: true });
  await fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
    files.forEach(item => {
      fs.copyFile(path.resolve(__dirname, 'files', item), path.resolve(__dirname, 'files-copy', item), (err) => {
        if (err) throw err;
      });
    });
  });
}

copyFiles();
