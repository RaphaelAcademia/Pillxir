// //Using filesystem module to open the textfile
// const fs = require('fs')
//   , filename = "test2.txt";
// fs.readFile(filename, 'utf8', function(err, data) {
//   if (err) throw err;

//   data = data.trim(); //Eliminate any uneccessary leading/trailing whitespace from text file

//   var arr = data.replace(/\n/g, " ").split(" "); //Replace all new lines with a space and split based on a space
//   var indexOfTotalAmount = arr.indexOf("TOTAL") + 1;
  
//   console.log(arr[0]);
//   console.log(arr[indexOfTotalAmount]);
  
// });

function parseText (path){

  const { createWorker } = require('tesseract.js'); 
  const worker = createWorker();

  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(path);
    console.log(text);
    await worker.terminate();
  })();
  
};

exports.parseText = parseText;
