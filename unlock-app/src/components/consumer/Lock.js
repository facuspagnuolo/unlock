import PropTypes from 'prop-types'
import UnlockPropTypes from '../../propTypes'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'

import HasKey from './HasKey'

import { purchaseKey } from '../../actions/lock'

const Lock = (props) => {
  if (!props.account || !props.lock || !props.currentKey) {
    return (<span>Loading...</span>)
  }
  return (<Row>
    <Col>
      <HasKey lock={props.lock} account={props.account} purchaseKey={props.purchaseKey} currentKey={props.currentKey} />
    </Col>
  </Row>
  )
}

Lock.propTypes = {
  account: PropTypes.string,
  lock: UnlockPropTypes.lock,
  currentKey: UnlockPropTypes.key,
  purchaseKey: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  purchaseKey: (lock, account) => dispatch(purchaseKey(lock, account)),
})

const mapStateToProps = state => {
  return {
    currentKey: state.currentKey,
    account: state.currentAccount,
    lock: state.currentLock,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lock)