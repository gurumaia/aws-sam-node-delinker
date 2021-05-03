#!/usr/bin/env node

const fs = require('fs-extra');
const re = /.*[\/\\]/;
if (fs.pathExistsSync('node_modules')) {
    var finder = require('findit')('node_modules');
    
    finder.on('link', function(dir) {
        console.log('Link: ' + dir);
    
        var dirName = dir.replace(re, '');
        
        fs.copySync(`${dir}/`, `temp/${dirName}/`, { dereference: true });
        fs.unlinkSync(dir);
        fs.copySync(`temp/${dirName}`, `${dir}`);
        fs.removeSync('temp');
    })
}
