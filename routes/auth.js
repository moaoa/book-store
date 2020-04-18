const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Router = require('express').Router()

Router.post('/', (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).status.json({ msg: 'unauthorized' })
    bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.status(400).json({ msg: 'invalid credential' })
        jwt.sign(
            { id: user.id },
            'secret',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err
                res.json({
                    token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                })
            }
        )
    })
})

module.exports = Router
