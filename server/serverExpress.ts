import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use(cors())

type objConfig = {
  timestamp:number
}

app.post('/getDate', function (req, res) {

  const object = <objConfig>{}

   object.timestamp = Math.floor(new Date().getTime())

  res.json(object)

})

app.listen(8566, function () {
    console.log('Node server is running 8566..')
  })