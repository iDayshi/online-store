const {Schema, model} = require('mongoose')

const schema = new Schema({
  brand: String,
  name: String,
  type: String,
  typeDisplay: String,
  date: Number,
  rate: Number,
  price: Number,
  color: [{type: Schema.Types.ObjectId, ref: 'Color'}],
  info: {type: Schema.Types.ObjectId, ref: 'Info'}
}, {
  timestamps: true
})

module.exports = model('Phone', schema)
