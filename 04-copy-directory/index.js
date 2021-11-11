const fs = require('fs');
const { readdir, mkdir, rm } = require('fs/promises');
const path = require('path');
const targetFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');


const copyDirection = async (src, copysrc) => {
  await rm(copysrc, { recursive: true, force: true});
  fs.access(copysrc, err => {
    if(err){
      mkdir(copysrc, { recursive: true })
    } 
  })
  await readdir(src).then(files => files.forEach(file => {
    fs.copyFile(`${src}/${file}`, `${copysrc}/${file}`,(err) => {
        if (err) {
          console.log("Error Found:", err);
        }
      });
    console.log(file);
  }))
}

copyDirection(targetFolder, copyFolder);
