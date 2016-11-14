import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

const app = express();
app.use(cors());

function getUserName(params) {
  let arr = params.split('/');
  let res;
  for(let index in arr) {
    if(!/com|ru|htt|--/.test(arr[index]) && arr[index] != '') {
      res = `@${/([a-zA-Zа-яА-Я\d_\.]{1,})/.exec(arr[index])[0]}`;
      break;
    }
  };
  
  if (res.length > 0) {
    return res;
  } else {
    new Error('Invalid username');
  }
}

app.get('/task2C', function (req, res) {
  try {
    let result = getUserName(req.query.username);
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
