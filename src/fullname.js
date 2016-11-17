
function clearArray(fullname) {
  let arr = [];

  for (let value of fullname) {
    if (typeof value === 'string' 
    && value !== "" 
    && value !== " " 
    && value !== undefined 
    && value !== null) {
      arr.push(value);
    } 
  }
  return arr;
}

function getLastname(param) {
  let str = '';
  param.split('').forEach((value,i) => {
    if(i == 0) {
      str += value.toUpperCase();
    } else {
      str += value.toLowerCase();
    } 
  });

  return str;
}

function testParam(param, lastname) {
  if(/(\d|_|\/|\\)/.test(param)) { 
    throw new Error('Invalid fullname');
  } 
}

function getInitials (param) {
    testParam(param);
    let tmp = /[a-zа-я]{1}/iu.exec(param);
    if (typeof tmp == 'object') {
      return tmp[0].toUpperCase();
    } else {
      throw new Error('Invalid fullname');
    }
}

export default async (req, res) => {
  let response;
  try {
    let fullname = clearArray(req.query.fullname.split(' '));
    let arrayLength = fullname.length;
    if (arrayLength === 0 || arrayLength > 3 || fullname[0] == '') {
      response = 'Invalid fullname';
    } else if (arrayLength === 3) {
        testParam(fullname[2]);
        let middleName = getInitials(fullname[1]);
        let firstName = getInitials(fullname[0]);
        response = `${getLastname(fullname[2])} ${firstName}. ${middleName}.`;
    } else if (arrayLength === 2) {
        testParam(fullname[1]);
        let firstName = getInitials(fullname[0]);
        response = `${getLastname(fullname[1])} ${firstName}.`;
    } else if (arrayLength === 1) {
      testParam(fullname[0]);
      response = `${getLastname(fullname[0])}`;
    }
  } catch (err) {
    response = 'Invalid fullname';
  }

  return response;
};