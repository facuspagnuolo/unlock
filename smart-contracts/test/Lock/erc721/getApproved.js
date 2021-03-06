const deployLocks = require('../../helpers/deployLocks')
const shouldFail = require('../../helpers/shouldFail')
const Unlock = artifacts.require('../../Unlock.sol')
const Zos = require('zos')
const TestHelper = Zos.TestHelper

let locks

contract('Lock ERC721', (accounts) => {
  const proxyAdmin = accounts[1]
  const unlockOwner = accounts[2]

  before(async function () {
    this.project = await TestHelper({ from: proxyAdmin })
    this.proxy = await this.project.createProxy(Unlock, { initMethod: 'initialize', initArgs: [unlockOwner], initFrom: unlockOwner })
    this.unlock = await Unlock.at(this.proxy.address)
    locks = await deployLocks(this.unlock)
  })

  describe('getApproved', () => {
    let lockOwner

    before(() => {
      return locks['FIRST'].owner().then((_owner) => {
        lockOwner = _owner
      })
    })

    it('should fail if no one was approved for a key', async () => {
      await shouldFail(locks['FIRST'].getApproved(accounts[1]), 'No approved recipient exists')
    })
  })
})
