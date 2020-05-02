'use strict';

exports.moveFile = (file) =>{
    file.mv('./uploads/' + file.name);
};