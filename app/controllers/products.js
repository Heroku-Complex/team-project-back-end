'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Product = models.product

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Product.find()
    .then(products => res.json({
      products: products.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    product: req.product.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  if (req.user.admin === true) {
    const product = Object.assign(req.body.product, {
      _owner: req.user._id
    })
    Product.create(product)
    .then(product =>
      res.status(201)
        .json({
          product: product.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
  } else {
    res.status(403)
  }
}

const update = (req, res, next) => {
  if (req.user.admin === true) {
    delete req.body._owner  // disallow owner reassignment.
    req.product.update(req.body.product)
    .then(() => res.sendStatus(204))
    .catch(next)
  } else {
    res.sendStatus(403)
  }
}

const destroy = (req, res, next) => {
  if (req.user.admin === true) {
    req.product.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
  } else {
    res.sendStatus(403)
  }
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Product), only: ['show'] },
  { method: setModel(Product, { forUser: true }), only: ['update', 'destroy'] }
] })
