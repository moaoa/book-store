const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const passport = require('passport')
const access = require('../configure/access')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.split(' ').join('-'))
    },
})

const upload = multer({ storage }).single('file')
router.post('/', passport.authenticate('jwt'), upload, async (req, res) => {
    const { title, pageCount, publishedAt, price } = req.body

    const newBook = new Book({
        title,
        pageCount,
        price,
        publishedAt: new Date(publishedAt),
        user: req.user.id,
        imgName: req.file.filename,
    })
    try {
        await newBook.save()
        res.json({ book: newBook, path: req.imgPath })
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
            book = await Book.findOne({ slug: req.params.slug })
            let granted = req.user.role == 'admin' || req.user.id == book.user
            let imgFilePath = path.join(
                __dirname,
                '../',
                'uploads',
                book.imgName
            )

            if (granted) {
                if (fs.existsSync(imgFilePath)) fs.unlinkSync(imgFilePath)

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
