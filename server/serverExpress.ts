import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json());


router.use(cors())


type objConfig = {
  timestamp:number
}

router.get('/getDate', function (req, res) {

  const object = <objConfig>{}

  object.timestamp = Math.floor(new Date().getTime())

  //res.set('Cache-Control', 'public, max-age=180');

  res.json(object)

})

app.use('/', router)

app.listen(8566, function () {
    console.log('Node server is running 8566..')
  })