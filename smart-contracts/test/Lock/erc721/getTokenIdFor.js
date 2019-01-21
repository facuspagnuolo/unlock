const Units = require('ethereumjs-units')
const Web3Utils = require('web3-utils')
const BigNumber = require('bignumber.js')

const deployLocks = require('../../helpers/deployLocks')
const shouldFail = require('../../helpers/shouldFail')
const Unlock = artifacts.require('../../Unlock.sol')

let unlock, locks

contract('Lock ERC721', accounts => {
  before(async () => {
    unlock = await Unlock.deployed()
    locks = await deployLocks(unlock)
  })

  describe('getTokenIdFor', () => {
    it('should abort when the key has no owner', async () => {
      await shouldFail(locks['FIRST'].getTokenIdFor(accounts[3]), 'No such key')
    })

    it("should return the tokenId for the owner's key", async () => {
      await locks['FIRST'].purchaseFor(
        accounts[1],
        Web3Utils.toHex('Satoshi'),
        {
          value: Units.convert('0.01', 'eth', 'wei'),
          from: accounts[1]
        }
      )
      let ID = new BigNumber(await locks['FIRST'].getTokenIdFor(accounts[1]))
      // This is the first key purchased, so the tokenID should be 1
      assert(ID.eq(1))
    })
  })
})
