import express from 'express';
import fetch from 'isomorphic-fetch'; 
import _ from 'lodash';
import cors from 'cors';

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


app.get('/task3A*', (req, res) => {
  try {
    let path = [];
    req.url.replace('/task3A','').split('/').map((value) => {
      if (value != '') path.push(value);
    });

    if(path.length === 0) {
      res.json(pc);
    } else if(path[0] === 'volumes') { 
      let volume = {};
      let arrVolumes = {};
      pc['hdd'].map((value, index)=> {
          volume = _.pick(value, ['size','volume']);
          arrVolumes[volume.volume] = volume.size + (arrVolumes[volume.volume] ? +arrVolumes[volume.volume].replace('B','') : 0) + 'B'; 
      });

      res.json(arrVolumes);
    } else { 
      let response = pc;
      path.map((prop) => {
        if(response.constructor()[prop] !== undefined) {
            throw new Error('No data');
        } 
        
        response = response[prop];
      });

      if (response !== undefined) {
        res.json(response);
      } else {
        throw new Error('No data');
      } 
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});