const {Schema, model} = require('mongoose')

const schema = new Schema({
  colorId: String,
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

module.exports = model('Color', schema)
