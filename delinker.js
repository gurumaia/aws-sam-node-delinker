#!/usr/bin/env node

const fs = require('fs-extra');
var finder = require('findit')('.aws-sam/build/');
const re = /.*[\/\\]/;

finder.on('link', function(dir) {
    console.log('Link: ' + dir);

    var dirName = dir.replace(re, '');
    
    fs.copySync(`${dir}/`, `temp/${dirName}/`, { dereference: true });
    fs.unlinkSync(dir)
    fs.copySync(`temp/${dirName}`, `${dir}`);
})
