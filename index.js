const express = require('express')  // express 모듈을 가져옴
const app = express() // 새로운 express 앱을 만듦
const port = 5000 // 5000번 포트를 백서버로

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sunwoo:walcott14@boilerplate.qqvgt.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
}) // '/' 디렉토리에 'Hello World!'를 출력

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) // 위에 설정한 포트에 앱을 실행
