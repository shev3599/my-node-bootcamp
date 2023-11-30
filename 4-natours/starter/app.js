const express = require('express');
const fs = require('fs');
const app = express();

// app.get('/', (req, res) => {
//   res.status(220).json({
//     message: 'This is GET method test',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.status(210).json({
//     message: 'This is POST method test',
//     app: 'Natours',
//   });
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}\\dev-data\\data\\tours-simple.json`)
);

//console.log('tours:', tours);
app.get('/api/v1/tours', (req, res) => {
  res
    .status(210)
    .json({ status: 'success', result: tours.length, data: { tours } });
});

port = 3000;
app.listen(port, () => {
  console.log('Server running on port: 127.0.0.1:', port);
});
