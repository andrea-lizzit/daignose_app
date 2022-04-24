const { ipcMain } = require( 'electron' );
const path = require( 'path' );
const fs = require( 'fs-extra' );
const os = require( 'os' );
const open = require( 'open' );
const { readdir } = require('fs').promises;
const dirTree = require("directory-tree");

// get application directory
const appDir = path.resolve( os.homedir(), 'dAIgnosis-files' );
fs.ensureDirSync( appDir );
/****************************/

// get the list of files
exports.getFiles2 = () => {
    const files = fs.readdirSync( appDir );

    return files.map( filename => {
        const filePath = path.resolve( appDir, filename );
        const fileStats = fs.statSync( filePath );

        return {
            name: filename,
            path: filePath,
            size: Number( fileStats.size / 1000 ).toFixed( 1 ), // kb
        };
    } );
};

getFiles3 = async function(dir = appDir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        var ret;
        if (dirent.isDirectory()) {
            ret = getFiles(res);
        } else {
            ret = res;
        }
        return ret
    }));
    return files;//Array.prototype.concat(...files);
}
getFiles = function(dir = appDir) {
    return dirTree(dir);
}
exports.getFiles = getFiles

/****************************/

// add files
exports.addFiles = ( files = [] ) => {
    
    // ensure `appDir` exists
    fs.ensureDirSync( appDir );
    
    // copy `files` recursively (ignore duplicate file names)
    files.forEach( file => {
        const filePath = path.resolve( appDir, file.name );

        if( ! fs.existsSync( filePath ) ) {
            fs.copyFileSync( file.path, filePath );
        }
    } );
};

// delete a file
exports.deleteFile = ( filename ) => {
    const filePath = path.resolve( appDir, filename );

    // remove file from the file system
    if( fs.existsSync( filePath ) ) {
        fs.removeSync( filePath );
    }
};

// open a file
exports.openFile = ( filename ) => {
    const filePath = path.resolve( appDir, filename );

    // open a file using default application
    if( fs.existsSync( filePath ) ) {
        open( filePath );
    }
};

exports.getFile = (filename) => {
    console.log(filename);
    return fs.readFileSync(filename).toString("base64");
}
