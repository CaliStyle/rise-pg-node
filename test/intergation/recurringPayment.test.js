const assert = require('assert')
const RPG = require('../../dist').RPG

describe('#Intergration RecurringPayment', () => {
  let rpg

  beforeEach(() => {
    rpg = new RPG({
      apiKey: process.env.API_KEY,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      transform: false,
      debug: true, sandbox:true
    })
  })

})
