const {Schema, model} = require('mongoose')

const schema = new Schema({
  orderId: String,
  dateOrder: String,
  itemsOrder: Array,
  userId:{ type: Schema.Types.ObjectId, ref: "User" },
  confirm: Boolean
}, {
  timestamps: { createdAt: 'created_at' }
})

module.exports = model('Order', schema)
