import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions, selectors } from 'data'
import { ModalName } from 'data/types'

import { getFirstAndLastDaysOfYear } from './model'
import { getAddressesAndXpubs, getExchangeDomain, getReportYearOptions } from './selectors'
import TaxCenter from './template'

const TaxCenterContainer = ({
  exchangeDomain,
  modalActions,
  options,
  reportsR,
  taxCenterActions,
  walletDataR
}) => {
  const [option, setOption] = useState(0)

  const handleClick = () => {
    const limits = getFirstAndLastDaysOfYear(option)

    taxCenterActions.createReport({ walletData: walletDataR, ...limits })
    modalActions.showModal(ModalName.GENERATE_REPORT_MODAL)
  }

  const handleChange = (value) => setOption(value)

  useEffect(() => {
    taxCenterActions.getReports()
  }, [])

  return (
    <TaxCenter
      exchangeDomain={exchangeDomain}
      value={option}
      onChange={handleChange}
      options={options}
      reportsR={reportsR}
      onClick={handleClick}
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators(actions.modals, dispatch),
  taxCenterActions: bindActionCreators(actions.components.taxCenter, dispatch)
})

const mapStateToProps = (state) => ({
  exchangeDomain: getExchangeDomain(state),
  options: getReportYearOptions(),
  reportsR: selectors.components.taxCenter.selectReports(state),
  walletDataR: getAddressesAndXpubs(state)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(TaxCenterContainer)
