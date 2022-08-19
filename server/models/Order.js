const {Schema, model} = require('mongoose')

const schema = new Schema({
  orderId: String,
  order: [{ type: Schema.Types.ObjectId, ref: "Phone" }],
  userId:{ type: Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: { createdAt: 'created_at' }
})

module.exports = model('Order', schema)
