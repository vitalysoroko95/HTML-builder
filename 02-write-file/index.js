const fs = require('fs');
const path = require('path');
const {stdout, stdin} = process;





fs.writeFile(path.join(__dirname, 'text.txt'), '', err => {if(err) throw err;});


stdout.write('Hello\n');
stdin.on('data', data=>{
  let str = data.toString().trim();
  if (str === 'exit'){
    stdout.write('good bye!\n');
    process.exit();
  } else

  {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      data,
      err => {
        if (err) throw err;
      }
    );
  }
});

process.on('SIGINT', () => {
  stdout.write('good bye!\n');
  process.exit();
});







