if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const Book = require('./models/Book')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
const booksRoute = require('./routes/books')

// db
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', () => console.log('error'))
db.once('open', () => console.log('connected'))

app.get('/allbooks', async (req, res) => {
    let allbooks
    try {
        allbooks = await Book.find()
        res.json({ books: allbooks })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

app.use('/books', booksRoute)

app.listen(port)
