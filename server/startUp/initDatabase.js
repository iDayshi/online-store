const Info = require("../models/Info")
const Color = require("../models/Color")
const Phone = require("../models/Phone")
const infoMock = require('../mock/infoPhones.json')
const colorMock = require('../mock/colorPhones.json')
const phoneMock = require('../mock/phones.json')
const chalk = require("chalk");

module.exports = async () => {

  const info = await Info.find()
  if (info.length !== infoMock.length) {
    await createInitialEntity(Info, infoMock)
  }

  const colors = await Color.find()
  if (colors.length !== colorMock.length) {
    await createInitialEntity(Color, colorMock)
  }

   const phones = await Phone.find()
  if (phones.length !== phoneMock.length) {
     await createInitialEntity(Phone, phoneMock)
   }

}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (err) {
        return console.log(chalk.red.inverse(`ERROR: ${err.message}`))
      }
    })
  )
}