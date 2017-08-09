'use strict'

// requirements
const controller = require('lib/wiring/controller')
const models = require('app/models')
const Charge = models.charge
const authenticate = require('./concerns/authenticate')
// this secret key is given to us from stripe
const keySecret = process.env.GLORIUS_SECRET_KEY
const stripe = require('stripe')(keySecret)

const create = (req, res, next) => {
  // this data is given to us from the token from stripe
  stripe.customers.create({
    // in your stripe dashboard, this is the displayed email as customer
    email: req.body.email,
    // their card (it is hashed)
    card: req.body.id
  }, {
    // this is required for authentication
    api_key: keySecret
  })
  .then(customer => {
    // the charge itself
    stripe.charges.create({
      // the amount
      amount: req.body.amount,
      // the description isn't nescesary but great for us to see later on
      description: 'Sample Charge',
      currency: 'usd',
      // hashed by stripe and placed in the token for us
      customer: customer.id
    }, {
      // this is requried for authentication
      api_key: keySecret
    })
    .then(charge => {
      res.send(charge)
      // more of the charge itself
      Charge.create({
        // the token id (the credit card)
        'stripeToken': charge.id,
        // amount is always in cents
        'amount': charge.amount,
        '_owner': req.user._id
      })
    })
    // error return
      .catch(error => {
        res.status(500).send({error: 'Your purchase has failed.'})
      })
  })
}

module.exports = controller({
  create
}, { before: [
  { method: authenticate }
] })
