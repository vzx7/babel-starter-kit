import express from 'express';
import fetch from 'isomorphic-fetch'; 
import _ from 'lodash';
import cors from 'cors';

import runTask2B from './fullname';
import runTask2C from './@username';
import runTask2A from './task_a+b';
import runTask3A from './API80286';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};

fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

app.get('/Task2B', function (req, res) {
    runTask2B(req, res)
      .then( async (response) => {
       await res.json(response);
      }).catch(err => {
        console.log('Чтото пошло не так:', err);
        res.sendStatus(404);
      });
});

app.get('/Task2C', function (req, res) {
    runTask2C(req, res)
      .then( async (response) => {
       await res.send(response);
      }).catch(err => {
        console.log('Чтото пошло не так:', err);
        res.sendStatus(404);
      });
});

app.get('/task2A', function (req, res) {
  runTask2A(req, res)
    .then( async (response) => {
      await res.json(response);
    }).catch(err => {
      console.log('Чтото пошло не так:', err);
      res.sendStatus(404);
    });
});

app.get('/task3A*', (req, res) => {
  runTask3A(req, res, pc)
    .then( async (response) => {
      await res.json(response);
    }).catch(err => {
      console.log('Чтото пошло не так:', err);
      res.sendStatus(404);
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});