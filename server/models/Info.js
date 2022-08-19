const {Schema, model} = require('mongoose')

const schema = new Schema({
  infoId: String,
  value: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

module.exports = model('Info', schema)
