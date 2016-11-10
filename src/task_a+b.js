import express from 'express'

const app = express()

app.get('/', function (req, res) {
  let a = parseInt( req.query.a );
  let b = parseInt( req.query.b );
  res.send(`Вывод: ${ (isNaN(a) ? 0 : a) + (isNaN(b) ? 0 : b)}` )
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
