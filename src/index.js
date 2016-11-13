import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

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

app.get('/task3A', async (req, res) => {
    res.json(pc);
});

app.get('/task3A/:devace', async (req, res) => {
  try {
    let devace = req.params.devace;
    let itog = {};
    if (devace === 'volumes') { 
      let volume = {};
      pc['hdd'].map((value, index)=> {
          volume = _.pick(value, ['size','volume']);
          itog[volume.volume] = volume.size + (itog[volume.volume] ? +itog[volume.volume].replace('B','') : 0) + 'B'; 
      });
    } else {
      itog = pc[devace];
    }

    if(itog === undefined ) {
      throw new Error('Not found');
    } else {
      res.json(itog);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.get('/task3A/:devace/:params', async (req, res) => {
  try {
    let param = pc[req.params.devace][req.params.params];
    if (param) {
      res.json(param);
    } else {
      throw new Error('Not found');
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.get('/task3A/:devace/:params/:end', async (req, res) => {
  try {
    let devace = req.params.devace;
    let params = req.params.params;
    let end = req.params.end;
    let data;
    if (devace === 'hdd') {
      let volume;
      if (pc[devace][params][end]) {
        pc['hdd'].map((value, index)=> {
          if (index == req.params.params) {
            if (end != 'size') {
              res.send(`"${_.pick(value, [end])[end]}"`);
            } else {
              res.json(_.pick(value, [end])[end]);
            }
          } 
        });
      } else throw new Error('Not found');
    }
  } catch (err) {
    res.sendStatus(404);
  }
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
