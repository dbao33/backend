
import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import routes from './src/v1/routes/indexRoute.js'


//runnig on this port
const PORT = process.env.PORT || 5050


const app = express()
// Sử dụng body-parser middleware
app.use(express.json())
routes(app)



mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => console.log('Connected!'))
    .catch(err => console.log('Error connecting', err))



app.get('/', (req, res) => {
    res.send('hello world everyone')
})

app.listen(PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)
