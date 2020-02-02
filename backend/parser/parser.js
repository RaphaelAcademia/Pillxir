const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');

/*
 * After a receipt has been uploaded, transcribe
 * to text
 * 
 */

function parseText(path){
    
    filename = path.substring(8, path.length - 4);
    filenameExtension = path.substring(8);
    
    exec('tesseract ./uploads/' + filenameExtension + ' ' + filename, (err, stdout, stderr) => {
    
    if (err) {
        // node couldn't execute the command
        return;
    }

    moveFile(filename);

    // Commented out code below is for debugging
    // console.log('tesseract ./uploads/' + filenameExtension + ' ' + filename);
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);

    });
}

/*
 * After a file has been transcribed,
 * move it to the transcribed folder
 *  
 */

function moveFile(filename){

    exec('mv ' + filename +'.txt ./transcribed', (err, stdout, stderr) => {
    
    if (err) {
        // node couldn't execute the command
        return;
    }

     // Commented out code below is for debugging
    // console.log('mv ' + filename +'.txt ./transcribed');
    // console.log(filename + '.txt');
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);

    putTextToDatabase(filename);

    });   
}

function putTextToDatabase (filename){

    fs.readFile('./transcribed/' + filename + '.txt', 'utf8', (err, data) => {

        if (err){
            throw err;
        } 

        storeName = data.split('\n').shift();

        data = data.trim(); // Trim unnecessary whitepsace

        // Basic parsing,
        arr = data.replace(/\n/g, " ").split(" "); //Replace all new lines with a space and split based on a space
        
        // TODO: Account for the different ways total can show up
        indexOfTotalAmount = arr.indexOf("TOTAL:") + 1;

        if (arr.indexOf("TOTAL:") == -1)
            indexOfTotalAmount = arr.indexOf("TOTAL") + 1;

        totalAmount = arr[indexOfTotalAmount].replace('$', '');
        axios.post('http://localhost:3001/receipts', {
            Total: totalAmount,
            Store: storeName
        })

    });
}

exports.parseText = parseText;
