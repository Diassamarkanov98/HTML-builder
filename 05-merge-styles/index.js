const fs = require('fs');
const path = require('path');
const cssBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const streamWrite = fs.createWriteStream(cssBundle, 'utf-8')
let array = [];
fs.readdir(`${__dirname}/styles`, 
  { withFileTypes: true },
  (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
        fs.stat(__filename, (err, stats) => {
            if (err) throw err;
            if (stats.isFile() == true && path.extname(file.name) == '.css') {
                const streamRead = fs.createReadStream(path.join(`${__dirname}/styles`, `${file.name}`), {encoding:'utf-8'});
                streamRead.on('data', (data) => streamWrite.write(data.toString() + '\n'));
                streamRead.on('error', (err) => console.error(`err: ${err}`));
            } 
        });
    })
  }
})
