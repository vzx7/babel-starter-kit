function getUserName(params) {
  let arr = params.split('/');
  let res;
  for(let index in arr) {
    if(!/com|ru|http|[-]{2,}/.test(arr[index]) && arr[index] != '') {
      res = `@${/([a-zA-Zа-яА-Я\d_\.-]{1,})/.exec(arr[index])[0]}`;
      break;
    }
  };
  
  if (typeof res !== 'undefined') {
    return res;
  } else {
    throw new Error('Invalid username');
  }
}

export default async (req, res) => {
    return getUserName(req.query.username);
};