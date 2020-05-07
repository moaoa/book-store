const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const passport = require('passport')
const access = require('../configure/access')

router.post('/', passport.authenticate('jwt'), async (req, res) => {
    const { title, pageCount, publishedAt, price } = req.body

    console.log(req.user)

    const newBook = new Book({
        title,
        pageCount,
        price,
        publishedAt: new Date(publishedAt),
        user: req.user.id,
    })
    try {
        await newBook.save()
        res.json({ book: newBook })
    } catch (error) {
        res.status(500).json({ msg: 'internal server error' })
        console.log(error)
    }
})

router.put(
    '/:slug',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { title, price, pageCount, publishedAt } = req.body

        try {
            const book = await Book.findOne({ slug: req.params.slug })
            const permision = access.can(req.user.role).deleteAny('book')
            if (book == null)
                return res.status(400).json({ msg: 'bad request' })
            if (req.user.id == book.user || permision.granted) {
                book.title = title
                book.price = price
                book.pageCount = pageCount
                book.publishedAt = publishedAt
                await book.save()
                return res.json({ book: book })
            } else {
                res.status(401).json({ msg: 'unauthorized' })
            }
        } catch (error) {
            if (error) console.log(error)
        }
    }
)
router.delete(
    '/:slug',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        let book
        try {
            console.log('slug from delete route: ', req.params.slug)

            book = await Book.findOne({ slug: req.params.slug })
            let granted = req.user.role == 'admin' || req.user.id == book.user

            if (granted) {
                await book.remove()
                res.json({ success: true })
            } else {
                res.status(401).json({ msg: 'Not Allowed' })
            }
        } catch (error) {
            console.log(error)

            res.status(500).json({ msg: 'there was an error' })
        }
    }
)

module.exports = router
