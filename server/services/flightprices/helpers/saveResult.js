const fs = require('fs');
const dir = '../files'
const path = '../files/dataScrapped.json'

const saveData = (Data) => {

  //   let rawdata = fs.writeFileSync(path.resolve(dir, 'dataScrapped'));
  //   let student = JSON.stringify(rawdata);
  //   let student = (rawdata);

  //Create File JSON
  fs.unlinkSync('./dataScrapped.json')
  fs.writeFile('dataScrapped.json', JSON.stringify(Data, null, 2), () => {
    console.log('file has been created')
  })
}

module.exports = saveData