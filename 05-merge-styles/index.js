const fs = require('fs');
const path = require('path');
const {createWriteStream} = require('fs');



const stream = createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

async function createBundle(){

  fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
    if (!err) {
      files.forEach(item => {
        if (path.extname(item) == '.css'){
          const readStream = fs.createReadStream(path.resolve(__dirname, 'styles', item));
          let data = '';
          readStream.on('data', partData=>stream.write(data+=partData));
        }
      });
    }
  });
}
createBundle();