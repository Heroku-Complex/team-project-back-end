'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Charge = models.charge

const express = require('express')
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.GLORIUS_SECRET_KEY
const stripe = require('stripe')(keySecret)
const bodyParser = require("body-parser")

const index = (req, res, next) => {
  Charge.find()
    .then(charges => res.json({
      charges: charges.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    charge: req.charge.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next)  => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  }, {
  api_key: "sk_test_SJ6aCNdbEfjzHEwiZNsJPJmF"
})
  .then(customer => {
    stripe.charges.create({
      amount: req.body.amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }, {
    api_key: "sk_test_SJ6aCNdbEfjzHEwiZNsJPJmF"
  })
    .then(charge => {
        res.send(charge)
        Charge.create({
          "stripeToken": charge.id,
          "amount": charge.amount,
          "_owner": req.user._id
        })
      })
      .catch(err => {
        res.status(500).send({error: "Purchase Failed"})
      })
    })
}

//
// const create = (req, res, next) => {
//   const charge = Object.assign(req.body.charge, {
//     stripeToken: req.body.stripeToken,
//     amount: req.body.amount,
//     currency: 'usd',
//     decription: 'Test data',
//     _owner: req.user._id
//   })
//   Charge.create(charge)
//     .then(charge =>
//       res.status(201)
//         .json({
//           charge: charge.toJSON({ virtuals: true, user: req.user })
//         }))
//     .catch(next)

module.exports = controller({
  index,
  show,
  create
}, { before: [
  { method: authenticate }
] })
