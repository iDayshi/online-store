const express = require('express')
const auth = require('../middleware/auth.middleware')
const Order = require("../models/Order")
const User = require("../models/User");
const router = express.Router({mergeParams: true})


router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      let list = []
      if(req.user._id === "62fbbbdf573cbc1415096e70" ){
         list = await Order.find().populate("userId")
      } else {
         list = await Order.find({userId: req.user._id}).populate("userId")
      }
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

router.patch('/:orderId', auth, async (req, res) => {
  try {
    const {orderId} = req.params;
    if (req.user._id) {
      const updatedOrder = await Order.findByIdAndUpdate({_id:orderId}, {
          confirm: true
      },{new: true}).populate("userId");
      res.send(updatedOrder);
    } else {
      res.status(401).json({message: 'Unauthorized'});
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.',
    });
  }
});

router.delete('/:orderId', auth, async (req, res) => {
  try {
    const {orderId} = req.params
    const removedOrder = await Order.findById(orderId).populate("userId")

    if (req.user._id) {
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