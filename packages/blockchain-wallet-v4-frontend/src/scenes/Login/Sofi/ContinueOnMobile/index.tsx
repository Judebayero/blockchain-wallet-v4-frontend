import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Badge, Image, Text } from 'blockchain-info-components'
import { Wrapper } from 'components/Public'
import { media } from 'services/styles'

import { CircleBackground } from '../../model'

const ContentWrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
`

const AppButtons = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  width: 100%;
  max-height: 5.25rem;
  transition: all 0.5s ease;
  ${media.mobile`
  flex-direction: column;
    img {
      height: auto;
      width: 40%;
    }
  `};
`

const ContinueOnMobile = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <CircleBackground color='blue600'>
          <Image name='mobile' height='30px' color='white' />
        </CircleBackground>

        <Text size='20px' weight={600} color='black' lineHeight='1.5' style={{ marginTop: '8px' }}>
          <FormattedMessage
            id='scenes.sofi.signup.continueonphone'
            defaultMessage='Continue on your phone'
          />
        </Text>

        <Text
          color='grey900'
          lineHeight='1.5'
          style={{ marginBottom: '16px', marginTop: '8px' }}
          size='16px'
          weight={500}
        >
          <FormattedMessage
            id='scenes.sofi.continueonmobile.description1'
            defaultMessage='At this moment, the Blockchain.com Wallet is only available on mobile for your region.'
          />
        </Text>

        <Text
          color='grey900'
          lineHeight='1.5'
          style={{ marginBottom: '16px', marginTop: '8px' }}
          size='16px'
          weight={500}
        >
          <FormattedMessage
            id='scenes.sofi.continueonmobile.description2'
            defaultMessage='To keep enjoying your Blockchain.com experience, download the app.'
          />
        </Text>
        <AppButtons>
          <Badge type='applestore' />
          <Badge type='googleplay' />
        </AppButtons>
      </ContentWrapper>
    </Wrapper>
  )
}

export default ContinueOnMobile
