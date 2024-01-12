const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//1. Middlewares

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from middleware 1 🤝');
  next();
});
app.use((req, res, next) => {
  console.log('Hello from middleware 2 🤞');
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan('dev'));

// 2. Route handlers

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}\\dev-data\\data\\tours-simple.json`)
);

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};
const getOneTour = (req, res) => {
  console.log('req.params:', req.params.id);
  console.log('req.requestTime', req.requestTime);
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'invalid id, no data',
    });
  }
  res.status(200).json({
    status: 'success',
    reqestedAt: req.requestTime,
    data: { tour },
  });
};

const createOneTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}\\dev-data\\data\\tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      //console.log('Error', err);
      res.status(201).json({
        status: 'success',
        tour: newTour,
      });
    }
  );
  console.log('id', newId);
  console.log('req.body:', req.body);
  console.log('newTour', newTour);
  //res.status(210).send('Done');
};

const updateOneTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid id, no data, no patch',
    });
  }
  res.status(200).json({
    status: 'success',
    data: '<Updated tour here...>',
  });
};

const deleteOneTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid id, no data, no patch',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id/', getOneTour);
//app.post('/api/v1/tours', createOneTour);
//app.patch('/api/v1/tours/:id/', updateOneTour);
//app.delete('/api/v1/tours/:id/', deleteOneTour);

// 3. Routes

app.route('/api/v1/tours').get(getAllTours).post(createOneTour);
app
  .route('/api/v1/tours/:id/')
  .get(getOneTour)
  .patch(updateOneTour)
  .delete(deleteOneTour);

// 4. Start the server

port = 3000;
app.listen(port, () => {
  console.log('Server running on port: 127.0.0.1:', port);
});
