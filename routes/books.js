const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const moment = require('moment')

router.put('/:slug', async (req, res) => {
    const { title, price, pageCount, publishedAt } = req.body
    console.log('title from backend: ', title)

    try {
        const book = await Book.findOne({ slug: req.params.slug })
        book.title = title
        book.price = price
        book.pageCount = pageCount
        book.publishedAt = publishedAt
        await book.save()
        res.json({ book: book })
    } catch (error) {
        if (error) console.log(error)
    }
})
router.delete('/:slug', async (req, res) => {
    try {
        await Book.findOneAndDelete({ slug: req.params.slug })
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ msg: 'there was an error' })
    }
})
router.post('/', async (req, res) => {
    const { title, pageCount, publishedAt, price } = req.body
    const newBook = new Book({
        title,
        pageCount,
        price,
        publishedAt: new Date(publishedAt),
    })
    try {
        await newBook.save()
        res.json({ book: newBook })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
