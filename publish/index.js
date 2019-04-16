const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const dirProject = path.resolve(__dirname, '../');

const dirPackage = path.resolve(dirProject, './publish/package');
if (!fs.existsSync(dirProject)) {
    console.log(`mkdir ${dirPackage}`);
    fs.mkdir(dirPackage);
}
else {
    fs.readdirSync(dirPackage).forEach((fileName) => {
        const pathDel = path.resolve(dirPackage, fileName);
        console.log(`delete ${pathDel}`);
        fs.unlinkSync(pathDel);
    })
}

const dirDist = path.resolve(dirProject, './dist');
const filesDist = fs.readdirSync(dirDist).map((fileName) => path.resolve(dirDist, fileName));

const filesOther = ['README.md', 'package.json'].map((fileName) => path.resolve(dirProject, fileName));


filesDist.concat(filesOther).forEach((src) => {
    const fileName = path.basename(src);
    const dest = path.resolve(dirPackage, fileName);
    console.log(`copy: ${dest}`);
    fs.copyFileSync(src, dest);
});


console.log('exec npm publish:');
execSync('npm publish', {cwd: dirPackage});