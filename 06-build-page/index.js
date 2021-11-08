const fs = require('fs');
const path = require('path');
const {createWriteStream} = require('fs');


async function buildPage() {
  //create folder
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist'), { 'recursive': true });
  const templateFile = await fs.promises.readFile(path.resolve(__dirname, 'template.html'), 'utf8');
  await fs.promises.writeFile((path.resolve(__dirname, 'project-dist', 'index.html')), templateFile);
  const readIndex = await fs.promises.readFile(path.resolve(__dirname, 'project-dist', 'index.html'), 'utf8');
  const tagName = readIndex.match(/{{[a-z]+}}/g);

  for (const itemName of tagName) {
    const fileName = itemName.slice(2,-2);

    const itemContent = await fs.promises.readFile(path.resolve(__dirname, 'components', `${fileName}.html`), 'utf8');
    const currentIndexFile = await fs.promises.readFile(path.resolve(__dirname, 'project-dist', 'index.html'), 'utf8');
    const newIndexFile = currentIndexFile.replace(itemName, itemContent);
    await fs.promises.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), newIndexFile);
  }


  //create css file
  const stream = createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
  fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
    if (!err) {
      files.forEach(item => {
        if (path.extname(item) == '.css') {
          const readStream = fs.createReadStream(path.resolve(__dirname, 'styles', item));
          let data = '';
          readStream.on('data', partData => stream.write(data += partData));
        }
      });
    }
  });


  //copy assets
  await fs.promises.rm(path.resolve(__dirname, 'project-dist', 'assets'), {recursive: true, force: true});
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), {recursive: true});
  const directories = await fs.promises.readdir(path.resolve(__dirname, 'assets'));
  for (let directory of directories) {
    await fs.promises.rm(path.resolve(__dirname, 'project-dist', 'assets', directory), {recursive: true, force: true});
    await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets', directory), {recursive: true});
    await fs.readdir(path.resolve(__dirname, 'assets', directory), (err, files) => {
      files.forEach(item => {
        fs.copyFile(path.resolve(__dirname, 'assets', directory, item), path.resolve(__dirname, 'project-dist', 'assets', directory, item), (err) => {
          if (err) throw err;
        });
      });
    });
  }

}


buildPage();