const express          = require('express')
const mongoose         = require('mongoose')
const morgan           = require('morgan')
const bodyParser       = require('body-parser')

const EmployeeRoute = require('./routes/Employee')
const AuthRoute     = require('./routes/auth')

mongoose.connect("mongodb+srv://theozhen:malamsabtu@theosabrien.yi1uweo.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Terhubung ke MongoDB'))
    .catch(err => console.error('Koneksi MongoDB gagal', err));

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) 
app.use('/uploads', express.static('uploads'))
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}')
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)