'use strict'

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  date_placed: {
    type: Date,
    required: true
  },
  salesProof: {
    type: {
      id: String,
      amount: Number,
      currency: String,
      status: String
    },
    required: false
  },
  products: {
    type: [{
      product_id: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }]
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: false,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
