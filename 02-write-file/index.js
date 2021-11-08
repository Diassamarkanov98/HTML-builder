const fs = require ('fs');
const path = require ('path');
const { stdin, stdout } = require('process');
const outputFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello! Please type something:\n');
stdin.on('data', (data) =>{
  if (data.toString().trim() === 'exit') {
    console.log("Good bue!See you soon.File saved in text.txt");
    process.exit();
}
  outputFile.write(data);
})
process.on('SIGINT', () => {
  console.log('I will w8 u for next meet :3');
  process.exit();
});
