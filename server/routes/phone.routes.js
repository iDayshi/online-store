const express = require('express')
const Info = require('../models/Info')
const router = express.Router({mergeParams:true})

router.get('/',  async (req, res) => {
  try{
    const list = await Info.find()
    res.status(200).send( list )
  }catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже."
    })
  }
})


module.exports = router