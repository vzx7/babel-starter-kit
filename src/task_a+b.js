import express from 'express'
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', function (req, res) {
  let a = parseInt( req.query.a );
  let b = parseInt( req.query.b );
  res.send(`${ (isNaN(a) ? 0 : a) + (isNaN(b) ? 0 : b)}` )
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
