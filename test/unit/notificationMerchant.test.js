const assert = require('assert')
const RPG = require('../../dist').RPG

describe('#Unit NotificationMerchant', () => {
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

  it('should exist', () => {
    assert.ok(rpg.notificationMerchant)
    assert.equal(rpg.notificationMerchant.rpg, rpg)
    // assert.equal(typeof rpg.notificationMerchant.addNotificationMerchant, 'function')
    // assert.equal(typeof rpg.notificationMerchant.editNotificationMerchant, 'function')
    // assert.equal(typeof rpg.notificationMerchant.allNotificationMerchants, 'function')
    // assert.equal(typeof rpg.notificationMerchant.notificationMerchantById, 'function')
  })
})