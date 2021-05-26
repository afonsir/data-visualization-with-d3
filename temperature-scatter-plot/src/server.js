const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('public'))
app.use(express.static('dist'))

app.listen(3333, () => {
  console.log('Server is running on 3333...')
})
