const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(console.log('Error:', err.message));
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile((file, data, err) => {
      if (err) reject('Could not write file :(');
      resolve('File was written with success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((data) => {
    console.log('data.body.message:', data.body.message);
    return writeFilePro('dog-image.txt', data.body.message);
  })
  .then(() => {
    console.log('random dog image saved to the file');
  })
  .catch((err) => {
    console.log('Catch err:', err.message);
  });
