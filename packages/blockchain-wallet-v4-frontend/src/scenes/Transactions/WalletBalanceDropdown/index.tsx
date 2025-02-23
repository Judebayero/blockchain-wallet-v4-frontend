import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect, ConnectedProps } from 'react-redux'
import BigNumber from 'bignumber.js'
import { flatten } from 'ramda'
import { bindActionCreators, Dispatch } from 'redux'
import { Field } from 'redux-form'
import styled from 'styled-components'

import { coinToString, fiatToString } from '@core/exchange/utils'
import { getFiatEntityRemediationAlert } from '@core/redux/walletOptions/selectors'
import {
  AddressTypesType,
  CoinfigType,
  CoinType,
  ExtractSuccess,
  FiatType,
  FiatTypeEnum,
  WalletFiatType
} from '@core/types'
import { CoinAccountIcon, Text } from 'blockchain-info-components'
import CoinDisplay from 'components/Display/CoinDisplay'
import FiatDisplay from 'components/Display/FiatDisplay'
import SelectBox from 'components/Form/SelectBox'
import { actions } from 'data'
import { convertBaseToStandard } from 'data/components/exchange/services'
import { getUserLegalEntity } from 'data/modules/profile/selectors'
import { ModalName } from 'data/types'
import { media } from 'services/styles'

import { getData } from './selectors'
import Loading from './template.loading'
import UserPortfolioPositionChange from './UserPortfolioPositionChange'

const Wrapper = styled.div`
  width: 320px;
  min-width: 320px;
  z-index: 2;
  margin-right: 30px;

  ${media.laptop`
    width: auto;
    margin-right: 0px;
  `}
`

const FiatNoticeWrapper = styled(Wrapper)`
  width: 335px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: ${(props) => props.theme.grey000};
  border-radius: 0.5rem;

  ${media.laptop`
    width: auto;
    margin-right: 0px;
  `}
`

const DisplayContainer = styled.div<{ isItem?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  height: ${(props) => (props.isItem ? 'auto' : '100%')};
  padding: ${(props) => (props.isItem ? '0px' : '16px')};
  background-color: transparent;
`
const AccountContainer = styled.div<{ isItem?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${(props) => (props.isItem ? '16px' : '0')};
  height: ${(props) => (props.isItem ? 'auto' : '100%')};
  padding: ${(props) => (props.isItem ? '12px 0' : '0')};
  width: 100%;
  cursor: pointer;
  .bc__single-value {
    position: relative;
    top: 0;
    transform: initial;
  }
  input {
    height: 0;
    position: absolute;
  }
`

const AmountContainer = styled.div<{ isItem?: boolean }>`
  display: flex;
  margin-top: ${(props) => (props.isItem ? '4px' : '0px')};
`

const FiatContainer = styled.div`
  display: flex;
  font-size: 12px;
  color: ${(props) => props.theme.grey400};
`

const CoinSelect = styled(SelectBox)`
  height: 100%;
  > div {
    height: 100%;
  }
  .bc__control {
    height: 100%;
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.grey100};
    box-sizing: border-box;

    & .bc__control--is-focused {
      border: 1px solid ${({ theme }) => theme.blue600};
    }
  }
  .bc__control .bc__value-container {
    padding: 0px;
    height: 100%;
  }
  .bc__menu {
    margin: 8px;
    border-radius: 8px;
  }
  .bc__group {
    &:not(:last-child) {
      ${AccountContainer} {
        border-bottom: 1px solid ${(props) => props.theme.grey000};
        box-sizing: border-box;
      }
    }
  }
  .bc__option {
    padding: 0px 12px;
  }
  .bc__indicators {
    align-items: flex-start;
    padding-top: 8px;
    padding-right: 8px;
  }
`

class WalletBalanceDropdown extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  isBtcTypeCoin = () => {
    return this.props.coin === 'BTC' || this.props.coin === 'BCH'
  }

  hasBalanceOrAccounts = (groups: Array<any>) => {
    if (this.props.coin in FiatTypeEnum) return false

    const balance = this.coinBalance(this.props.coin)
    const accounts = flatten(groups.map((group) => group.options))

    if (balance > 0) {
      return true
    }
    if (this.isBtcTypeCoin() && accounts.length > 4) {
      return true
    }
    return !this.isBtcTypeCoin() && accounts.length > 3
  }

  handleRequest = () => {
    const { coinfig } = window.coins[this.props.coin]
    this.props.modalActions.showModal(ModalName.REQUEST_CRYPTO_MODAL, {
      coin: coinfig.type.name !== 'FIAT' && this.props.coin,
      origin: 'WalletBalanceDropdown'
    })
  }

  isTotalBalanceType = (selectProps) => {
    // BTC/BCH
    if (selectProps.value === 'all') return true
    // ETH/PAX/STELLAR...
    return !selectProps.value
  }

  coinBalance = (selectProps) => {
    if (this.isTotalBalanceType(selectProps)) {
      // Total balance
      return this.props.data.getOrElse({
        addressData: { data: [] },
        balanceData: 0,
        currency: 'USD',
        currencySymbol: '$',
        sbBalance: { available: '0', pending: '0', withdrawable: '0' }
      } as SuccessStateType).balanceData
    }
    if (selectProps.value) {
      // Account balance
      if (selectProps.value.balance !== undefined) {
        return selectProps.value.balance
        // Custodial balance
      }
      return selectProps.value.available
    }
    return 0
  }

  accountLabel = (selectProps) => {
    if (this.isTotalBalanceType(selectProps)) {
      // All label
      const { coinfig } = window.coins[this.props.coin]
      return coinfig.displaySymbol
    }
    if (selectProps.value) {
      // Account/Custodial label
      return selectProps.value.label || selectProps.label
    }
    return ''
  }

  renderDisplaySubtext = (
    props: {
      selectProps: { options: Array<any> }
      value?: { type: AddressTypesType } | 'all'
    },
    data: SuccessStateType
  ) => {
    const balance = this.coinBalance(props) || 0
    const { coinfig } = window.coins[this.props.coin]

    const isAllOrCustodial = () => {
      return (
        props.value === 'all' ||
        (typeof props.value === 'object' && props.value.type === 'CUSTODIAL')
      )
    }

    const hasPendingBalance = () => {
      return data.sbBalance?.pending !== undefined && data.sbBalance?.pending !== '0'
    }

    if (coinfig.type.name !== 'FIAT') {
      switch (true) {
        case isAllOrCustodial() && hasPendingBalance():
          return (
            <Text size='14px' color='grey600' weight={600}>
              <FormattedMessage id='copy.pending' defaultMessage='Pending' />
              {': '}
              {coinToString({
                unit: { symbol: this.props.coin },
                value: convertBaseToStandard(
                  this.props.coin as CoinType,
                  data.sbBalance?.pending || '0'
                )
              })}
            </Text>
          )
        case this.hasBalanceOrAccounts(props.selectProps.options):
          return (
            <UserPortfolioPositionChange
              coin={this.props.coin as CoinType}
              currency={data.currency}
              coinBalance={new BigNumber(balance)}
            />
          )
        default:
          return (
            <Text size='14px' weight={500} color='blue600' onClick={this.handleRequest}>
              <FormattedMessage
                id='scenes.transactions.performance.request'
                defaultMessage='Request {coinTicker} Now'
                values={{ coinTicker: coinfig.symbol }}
              />
            </Text>
          )
      }
    } else {
      return (
        <Text size='14px' color='grey600' weight={500}>
          <FormattedMessage id='copy.pending' defaultMessage='Pending' />
          {': '}
          {fiatToString({
            unit: this.props.coin as WalletFiatType,
            value: convertBaseToStandard('FIAT', data.sbBalance?.pending || '0')
          })}
        </Text>
      )
    }
  }

  // FIXME: TypeScript use value: { AccountTypes }
  renderDisplay = (props: { selectProps: { options: Array<any> }; value }, children) => {
    const balance = this.coinBalance(props) || 0
    const account = this.accountLabel(props)
    const unsafe_data = this.props.data.getOrElse({
      addressData: { data: [] },
      balanceData: 0,
      currency: 'USD' as FiatType,
      currencySymbol: '$',
      sbBalance: { available: '0', pending: '0', withdrawable: '0' }
    } as SuccessStateType)

    return (
      <DisplayContainer>
        <AccountContainer>
          {children?.length > 0 && children[1]}
          <Text weight={500} color='grey400'>
            {account} <FormattedMessage id='copy.balance' defaultMessage='Balance' />
          </Text>
          <AmountContainer>
            <FiatDisplay
              coin={this.props.coin}
              size='24px'
              weight={500}
              cursor='pointer'
              color='grey800'
            >
              {balance}
            </FiatDisplay>
          </AmountContainer>

          {this.renderDisplaySubtext(props, unsafe_data)}
        </AccountContainer>
      </DisplayContainer>
    )
  }

  renderItem = (props: { label; value }) => {
    const { coin } = this.props
    const balance = this.coinBalance(props)
    const account = this.accountLabel(props)

    return (
      <DisplayContainer isItem>
        <CoinAccountIcon accountType={props.value.type} coin={coin} />
        <AccountContainer isItem>
          <Text weight={500} color='grey400' size='14px'>
            {account}{' '}
            {this.isTotalBalanceType(props) && (
              <FormattedMessage id='copy.balance' defaultMessage='Balance' />
            )}
          </Text>
          <AmountContainer isItem>
            <CoinDisplay
              coin={this.props.coin}
              size='12px'
              weight={500}
              cursor='pointer'
              color='grey800'
            >
              {balance}
            </CoinDisplay>
            <div style={{ width: '2px' }} />
            <FiatContainer>
              (
              <FiatDisplay
                coin={this.props.coin}
                size='12px'
                weight={500}
                color='grey400'
                cursor='pointer'
              >
                {balance}
              </FiatDisplay>
              )
            </FiatContainer>
          </AmountContainer>
        </AccountContainer>
      </DisplayContainer>
    )
  }

  showFiatTransformAlert = ({ userLegalEntity, ...rest }, coinfig: CoinfigType) => {
    const balance = this.coinBalance(rest) || 0
    // If not FIAT nor has balance, do not show
    if (coinfig.type.name !== 'FIAT' || balance <= 0) return false

    // Non BC_US with USD balance
    const NON_BC_US_WITH_USD = userLegalEntity !== 'BC_US' && coinfig.displaySymbol === 'USD'
    // Non BC_LT/BC_LT_2 with EUR/GBP balance
    const ANY_BC_LT_WITH_EUR_GBP =
      !userLegalEntity?.includes('BC_LT') && ['EUR', 'GBP'].includes(coinfig.displaySymbol)

    return NON_BC_US_WITH_USD || ANY_BC_LT_WITH_EUR_GBP
  }

  render() {
    const { coin, data, showFiatEntityRemediationAlert } = this.props
    const { coinfig } = window.coins[coin]

    const showConversionDisclaimer =
      showFiatEntityRemediationAlert && this.showFiatTransformAlert(this.props, coinfig)

    return data.cata({
      Failure: (e) => <Text>{typeof e === 'string' ? e : 'Unknown Error'}</Text>,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />,
      Success: (values) => {
        const { addressData } = values
        const options = addressData.data

        return (
          <>
            <Wrapper>
              <Field
                component={CoinSelect}
                elements={options}
                grouped
                hideIndicator={!this.hasBalanceOrAccounts(options)}
                openMenuOnClick={this.hasBalanceOrAccounts(options)}
                options={options}
                name='source'
                searchEnabled={false}
                templateDisplay={this.renderDisplay}
                templateItem={this.renderItem}
              />
            </Wrapper>

            {showConversionDisclaimer && (
              <FiatNoticeWrapper>
                <Text
                  weight={600}
                  size='14px'
                  lineHeight='21px'
                  style={{ marginBottom: '8px' }}
                  color='grey900'
                >
                  Changes to {coin} Balances
                </Text>
                <Text size='12px' color='grey900'>
                  Your {coinfig.name} ({coin}) balance will be converted to USDC daily at 12:00 am
                  UTC. To avoid any inconvenience buy crypto before the specified time.
                </Text>
              </FiatNoticeWrapper>
            )}
          </>
        )
      }
    })
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: getData(state, ownProps),
  showFiatEntityRemediationAlert: getFiatEntityRemediationAlert(state),
  userLegalEntity: getUserLegalEntity(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type OwnProps = {
  coin: CoinType | WalletFiatType
}

type SuccessStateType = ExtractSuccess<ReturnType<typeof getData>>

type Props = OwnProps & ConnectedProps<typeof connector>

export default connector(WalletBalanceDropdown)
