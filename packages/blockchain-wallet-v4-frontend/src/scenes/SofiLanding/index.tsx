import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Button, Text } from 'blockchain-info-components'
import { Wrapper } from 'components/Public'
import { actions, selectors } from 'data'
import { useRemote } from 'hooks'

import Loading from './template.loading'

const ContentWrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
`

const SofiLanding = () => {
  const dispatch = useDispatch()
  // use effect of checking sofi migration status
  // if it's complete redirect to wallet
  // add loading state until we know for sure
  useEffect(() => {
    dispatch(actions.modules.profile.initiateSofiLanding())
  }, [])

  useEffect(() => {})

  const { data, error, isLoading, isNotAsked } = useRemote(
    selectors.modules.profile.getSofiUserData
  )
  if (isLoading || isNotAsked) {
    return <Loading />
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Text size='20px' weight={600} color='black' lineHeight='1.5' style={{ marginTop: '8px' }}>
          <FormattedMessage
            id='scenes.sofi.welcome.header'
            defaultMessage='Welcome to Blockchain.com!'
          />
        </Text>
        <Text
          color='grey600'
          lineHeight='1.5'
          style={{ marginBottom: '16px', marginTop: '8px' }}
          size='16px'
          weight={500}
        >
          <FormattedMessage
            id='scenes.sofi.signup.welcome.body'
            defaultMessage='Migrating your crypto from SoFi is super quick. Choose how you’d like to continue. We’ll take care of migrating your crypto.'
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
            id='scenes.sofi.signup.welcome.new'
            defaultMessage='New to Blockchain.com?'
          />
        </Text>
        <Button
          data-e2e='newSofi'
          fullwidth
          nature='primary'
          onClick={() => dispatch(actions.router.push('/signup/sofi'))}
          style={{ marginBottom: '16px' }}
        >
          <Text color='white' size='16px' weight={600}>
            <FormattedMessage id='buttons.signup' defaultMessage='Sign Up' />
          </Text>
        </Button>
        <Text
          color='grey900'
          lineHeight='1.5'
          style={{ marginBottom: '16px', marginTop: '8px' }}
          size='16px'
          weight={500}
        >
          <FormattedMessage
            id='scenes.sofi.signup.welcome.existing'
            defaultMessage='Already have a Blockchain account?'
          />
        </Text>
        <Button
          data-e2e='existingSofi'
          fullwidth
          nature='dark'
          onClick={() => dispatch(actions.router.push('/login/sofi'))}
        >
          <Text color='white' size='16px' weight={600}>
            <FormattedMessage id='scenes.login.login' defaultMessage='Log In' />
          </Text>
        </Button>
      </ContentWrapper>
    </Wrapper>
  )
}

export default SofiLanding
