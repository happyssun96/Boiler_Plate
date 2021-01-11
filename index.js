const express = require('express')  // express 모듈을 가져옴
const app = express() // 새로운 express 앱을 만듦
const port = 5000 // 5000번 포트를 백서버로

const config = require("./config/key");

const bodyParser = require('body-parser');
const { User } = require("./models/User"); // User모델을 가져옴

app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded 정보를 가져와 분석

app.use(bodyParser.json()); // application/json 정보를 가져와 분석

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('안녕하세요~!')
}) // '/' 디렉토리에 'Hello World!'를 출력

app.post('/register', (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body); // req.body에 client의 정보들이 들어있다.
  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) // 위에 설정한 포트에 앱을 실행
