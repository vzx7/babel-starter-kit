import express from 'express'

const app = express()

function getInitials(param) {
  let tmp = /[a-zа-я]{1}/iu.exec(param);
  if (typeof tmp == 'object') {
    return tmp[0].toUpperCase();
  } else {
    throw new Error('Invalid fullname');
  }
}

app.get('/', function (req, res) {
  let response;
  let [...fullname] = req.query.fullname.split(' ');
  let arrayLength = fullname.length;

  if (arrayLength > 3 || fullname[0] == '' ) {
    response = 'Invalid fullname';
  } else if (arrayLength === 3) {
    try {
      let middleName = getInitials(fullname[1]);
      let firstName = getInitials(fullname[0]);
      response = `${fullname[2]} ${firstName}. ${middleName}.`;
    } catch (err) {
      response = err.message;
    } 
  } else if (arrayLength === 2) {
    try {
      let firstName = getInitials(fullname[0]);
      response = `${fullname[1]} ${firstName}.`;
    } catch (err) {
      response = err.message;
    } 
  } else if (arrayLength === 1) {
      response = `${fullname[0]}`;
  }

  res.send(response)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

