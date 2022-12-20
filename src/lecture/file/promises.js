const fs = require('src/lecture/file/file').promises;

const filename = './data.txt';
const encoding = 'utf-8';

fs.writeFile(filename, '도대체 누가 감히 나에게 맞선다는 것인가?\n')
    .catch(console.error);

fs.appendFile(filename, '천상천하 유아독존!!\n')
    .catch(console.error);

fs.readFile(filename, encoding)
    .then(data => {
        console.log(data)
        fs.copyFile(filename, 'data2.txt')
            .catch(console.error);
    })
    .catch(console.error);
