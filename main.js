/**
 *  Filetree-js
 *
 *  Copyright 2015 Mariusz Przybylski <mpxcode@gmail.com>
 *
 *  Licensed under GNU General Public License 2.0 or later.
 *  See LICENSE for details.
 */

fs = require('fs');

function DirNode(name) {
    this.name = name;
    this.sizeTotal = 0;
    this.sizeSelf = 0;
    this.numDirsTotal = 0;
    this.numDirsSelf = 0;
    this.dirs = [];
    this.numFilesTotal = 0;
    this.numFilesSelf = 0;
    this.files = [];
}

function GetDirSizeRecursDfs(dirPath, node) {
    try {
        var files = fs.readdirSync(dirPath);
    } catch(e) {
        return;
    }
    var nfiles = files.length;

    for(var i=0; i<nfiles; i++) {
        var tempPath = dirPath+'\\'+files[i];

        try {
            var stat = fs.lstatSync(tempPath);
        } catch(e) {
            continue;
        }

        if (stat.isDirectory()) {
            var subnode = new DirNode(files[i]);
            node.dirs.push(subnode);

            node.numDirsSelf++;
            node.numDirsTotal++;

            GetDirSizeRecursDfs(tempPath, subnode);

            node.sizeTotal += subnode.sizeTotal;
            node.numDirsTotal += subnode.numDirsTotal;
            node.numFilesTotal += subnode.numFilesTotal;
        } else if(stat.isFile()) {
            node.sizeTotal += stat.size;
            node.sizeSelf += stat.size;
            node.files.push([files[i], stat.size]);
            node.numFilesTotal++;
            node.numFilesSelf++;
        }
    }
}



var dirPath = 'e:\\ZendFramework-2.4.7';

var node = new DirNode('zf2');
GetDirSizeRecursDfs(dirPath, node);

process.stdout.write(JSON.stringify(node));
