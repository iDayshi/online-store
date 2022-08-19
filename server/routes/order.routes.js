const express = require('express')
const auth = require('../middleware/auth.middleware')
const Order = require("../models/Order")
const router = express.Router({mergeParams: true})


router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const list = await Order.find()
      res.send(list)
    } catch (err) {
      console.log(err.message)
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже."
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newOrder = await Order.create({
        ...req.body,
      })
      res.status(201).send(newOrder)
    } catch (err) {
      console.log(err.message)
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже."
      })
    }
  })

router.delete('/:OrderId', auth, async (req, res) => {
  try {
    const {orderId} = req.params
    const removedOrder = await Order.findById(orderId)

    if (removedOrder.userId.toString() === req.user._id) {
      await removedOrder.remove()
      return res.send(null)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }

  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже."
    })
  }
})

module.exports = router