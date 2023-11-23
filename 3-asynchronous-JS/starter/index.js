const fs = require('fs');
const superagent = require('superagent');
const { isArray } = require('util');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Cannot read file! Sorry!!! 😢');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file 😢!⛽');
      resolve('File was written with success');
    });
  });
};

const DogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}\\dog.txt`);
    console.log(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const data1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const data2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const data3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const all = await Promise.all([data1, data2, data3]);
    const imgs = all.map(el => el.body.message).join('\n');
    console.log('isArray all', Array.isArray(all));
    console.log('imgs:', imgs);

    await writeFilePro('dog-image.txt', imgs);
    console.log('Random dog image saved to the file');
  } catch (err) {
    console.log('Catch err:', err.message);
    throw err;
  }
  return '2: READY 🐕';
};

(async () => {
  try {
    console.log('1: Will getting log pics!');
    const x = await DogPic();
    console.log('x', x);
    console.log('3: Done getting log pics!');
  } catch (err) {
    console.log('ERROR 💣', err);
  }
})();

/*
console.log('1: Will getting log pics!');
DogPic()
  .then(x => {
    console.log('2x: ', x);
    console.log('3: Done getting log pics!');
  })
  .catch(err => {
    console.log('ERROR 💣', err);
  });
*/
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((data) => {
//     console.log('data.body.message:', data.body.message);
//     return writeFilePro('dog-image.txt', data.body.message);
//   })
//   .then(() => {
//     console.log('random dog image saved to the file');
//   })
//   .catch((err) => {
//     console.log('Catch err:', err.message);
//   });
