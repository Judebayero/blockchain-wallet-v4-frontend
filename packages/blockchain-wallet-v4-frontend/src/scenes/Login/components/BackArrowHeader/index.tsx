import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Icon, Text } from 'blockchain-info-components'
import { LoginFormType, LoginSteps, PlatformTypes, ProductAuthOptions } from 'data/auth/types'
import { isMobile } from 'services/styles'

const BackArrowWrapper = styled.div<{ hideBackArrow?: boolean; marginTop?: string }>`
  display: flex;
  justify-content: ${(props) => (props.hideBackArrow ? 'flex-end' : 'space-between')};
  margin-bottom: 24px;
  align-items: center;
  margin-top: ${(props) => props.marginTop || 'auto'};
`
const BackArrow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const EmailAndGuid = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

type Props = {
  formValues: LoginFormType
  handleBackArrowClick: () => void
  hideGuid?: boolean
  marginTop?: string
  platform?: PlatformTypes
  product?: ProductAuthOptions
}

const BackArrowHeader = ({
  formValues,
  handleBackArrowClick,
  hideGuid,
  marginTop,
  platform,
  product
}: Props) => {
  const isExchangeLogin = product === ProductAuthOptions.EXCHANGE
  const email = isExchangeLogin
    ? formValues.exchangeEmail
    : formValues.email || formValues.sofiLoginEmail
  const guid = formValues?.guid
  const firstPartGuid = guid?.slice(0, 4)
  const lastPartGuid = guid?.slice(-4)
  const hideBackArrow = platform === PlatformTypes.ANDROID || platform === PlatformTypes.IOS
  return (
    <BackArrowWrapper marginTop={marginTop} hideBackArrow={hideBackArrow}>
      {!hideBackArrow && (
        <BackArrow onClick={handleBackArrowClick}>
          <Icon
            data-e2e='signupBack'
            name='arrow-back'
            size='24px'
            color='blue600'
            style={{ marginRight: '8px' }}
            role='button'
          />

          <Text color='grey900' size='14px' weight={500} lineHeight='1.5'>
            <FormattedMessage id='copy.back' defaultMessage='Back' />
          </Text>
        </BackArrow>
      )}
      <EmailAndGuid>
        {hideGuid || (email && isMobile()) || isExchangeLogin ? (
          <Text
            color='blue600'
            size='12px'
            weight={600}
            lineHeight='1.5'
            style={{ marginRight: '2px' }}
          >
            {email}
          </Text>
        ) : (
          <Text color='grey400' size='12px' weight={600} lineHeight='1.5'>
            ({firstPartGuid}...{lastPartGuid})
          </Text>
        )}
        {formValues.step !== LoginSteps.CHECK_EMAIL &&
          formValues.email &&
          !hideGuid &&
          !isMobile() &&
          !isExchangeLogin && (
            <Text size='12px' weight={500} color='grey400'>
              ({firstPartGuid}...{lastPartGuid})
            </Text>
          )}
      </EmailAndGuid>
    </BackArrowWrapper>
  )
}

export default BackArrowHeader
