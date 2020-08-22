const fs = require('fs');

async function uploadFile(postDataObj, fileName) {
    try {
        var base64 = postDataObj.photo.split(';base64,')[1];
        var fileBuffer = new Buffer.from(base64, 'base64');
        var directory = `${rootDir}/public/uploads/`;
        await fs.writeFileSync(directory + fileName, fileBuffer, 'utf8');
        return { fileName: fileName };
    } catch (e) {
        return {}
    }
}

module.exports = uploadFile;