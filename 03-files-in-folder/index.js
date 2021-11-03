const fs = require('fs');
const path = require('path');



fs.readdir(path.resolve(__dirname, 'secret-folder'), (err, files) => {
  if (!err) {
    files.forEach(item => {
      fs.promises.stat(path.resolve(__dirname, 'secret-folder', item))
        .then(statFile => {
          if (!statFile.isDirectory()) {
            console.log(item.substring(0, item.lastIndexOf('.')) + ' - ' + path.extname(item.toString()).substring(1) + ' - ' + statFile.size + 'b');
          }
        });
    });
  }
});