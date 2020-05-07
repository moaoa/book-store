const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Router = require('express').Router()
const generateToken = require('../configure/generateToken')
const User = require('../models/User')
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    jwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email, password, done) {
            User.findOne({ email }, function (err, user) {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect Email' })
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' })
                }
                return done(null, user)
            })
        }
    )
)

const opt = {}
opt.jwtFromRequest = ExtractJwt.fromHeader('auth')

opt.secretOrKey = process.env.SECRET
passport.use(
    new jwtStrategy(opt, (jwtPayload, done) => {
        console.log('jwt payload', jwtPayload)

        User.findById(jwtPayload.id)
            .then((user) => {
                console.log(user)

                return done(null, user)
            })
            .catch((err) => done(err))
    })
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

Router.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ msg: 'some thing went wrong', user })
        }
        req.logIn(user, { session: false }, (err) => {
            if (err)
                return res
                    .status(400)
                    .json({ msg: 'some thing went wrong', err })
            const token = generateToken({ id: user.id })

            return res.json({
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id,
                    token,
                },
            })
        })
    })(req, res, next)
})
module.exports = Router
