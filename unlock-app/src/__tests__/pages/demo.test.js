import { mapStateToProps } from '../../pages/demo'

describe('Demo', () => {
  describe('mapStateToProps', () => {
    it('should yield the lock which matches the address of the demo page', () => {
      const lock = '0x4983D5ECDc5cc0E499c2D23BF4Ac32B982bAe53a'
      const router = {
        location: {
          pathname: `/demo/${lock}`,
        },
      }
      const props = mapStateToProps({ router })
      expect(props.lock).toBe(lock)
    })
  })
})
