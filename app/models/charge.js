'use strict'

const mongoose = require('mongoose')

// declaration of schema
const chargeSchema = new mongoose.Schema({
  // what to expect from the returned token from the stripe api
  stripeToken: {
    // all tokens are strings
    type: String,
    required: true
  },
  // the amount will be a number returned in the cents value
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  // description: {
  //   type: String,
  //   required: false
  // },
  // owner reference
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // add a timestamp for the transaction
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

chargeSchema.virtual('length').get(function length () {
  return this.text.length
})

const Charge = mongoose.model('Charge', chargeSchema)

module.exports = Charge
