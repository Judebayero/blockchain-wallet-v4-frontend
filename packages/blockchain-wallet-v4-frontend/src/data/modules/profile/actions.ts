import { NabuApiErrorType } from '@core/types'

import * as AT from './actionTypes'
import { ExchangeAuthOriginType, ProfileActionTypes } from './types'

export const clearProfileState = () => ({
  type: AT.CLEAR_PROFILE_STATE
})
export const clearSession = () => ({
  type: AT.CLEAR_SESSION
})

export const createUser = () => ({
  type: AT.CREATE_USER
})

export const fetchTiers = (): ProfileActionTypes => ({
  type: AT.FETCH_TIERS
})

export const fetchTiersFailure = (error): ProfileActionTypes => ({
  payload: { error },
  type: AT.FETCH_TIERS_FAILURE
})
export const fetchTiersLoading = (): ProfileActionTypes => ({
  type: AT.FETCH_TIERS_LOADING
})
export const fetchTiersSuccess = (userTiers): ProfileActionTypes => ({
  payload: { userTiers },
  type: AT.FETCH_TIERS_SUCCESS
})
// event, not used by reducer, not yet typed
export const fetchUserCampaigns = () => ({
  type: AT.FETCH_USER_CAMPAIGNS
})
export const fetchUserCampaignsFailure = (error: NabuApiErrorType): ProfileActionTypes => ({
  payload: { error },
  type: AT.FETCH_USER_CAMPAIGNS_FAILURE
})
export const fetchUserCampaignsLoading = (): ProfileActionTypes => ({
  type: AT.FETCH_USER_CAMPAIGNS_LOADING
})
export const fetchUserCampaignsSuccess = (userCampaigns): ProfileActionTypes => ({
  payload: { userCampaigns },
  type: AT.FETCH_USER_CAMPAIGNS_SUCCESS
})

export const fetchUser = (): ProfileActionTypes => ({
  type: AT.FETCH_USER
})
export const fetchUserDataFailure = (error): ProfileActionTypes => ({
  payload: { error },
  type: AT.FETCH_USER_DATA_FAILURE
})
export const fetchUserDataLoading = (): ProfileActionTypes => ({
  type: AT.FETCH_USER_DATA_LOADING
})
export const fetchUserDataSuccess = (userData): ProfileActionTypes => ({
  payload: { userData },
  type: AT.FETCH_USER_DATA_SUCCESS
})

export const authAndRouteToExchangeAction = (
  origin: ExchangeAuthOriginType
): ProfileActionTypes => ({
  payload: { origin },
  type: AT.AUTH_AND_ROUTE_TO_EXCHANGE
})
export const linkFromExchangeAccount = (linkId, email?, address?): ProfileActionTypes => ({
  payload: { address, email, linkId },
  type: AT.LINK_FROM_EXCHANGE_ACCOUNT
})
export const linkFromExchangeAccountFailure = (error): ProfileActionTypes => ({
  payload: { error },
  type: AT.LINK_FROM_EXCHANGE_ACCOUNT_FAILURE
})
export const linkFromExchangeAccountLoading = (): ProfileActionTypes => ({
  type: AT.LINK_FROM_EXCHANGE_ACCOUNT_LOADING
})
export const linkFromExchangeAccountSuccess = (data): ProfileActionTypes => ({
  payload: { data },
  type: AT.LINK_FROM_EXCHANGE_ACCOUNT_SUCCESS
})

export const linkToExchangeAccount = (utmCampaign): ProfileActionTypes => ({
  payload: { utmCampaign },
  type: AT.LINK_TO_EXCHANGE_ACCOUNT
})
export const linkToExchangeAccountFailure = (error): ProfileActionTypes => ({
  payload: { error },
  type: AT.LINK_TO_EXCHANGE_ACCOUNT_FAILURE
})
export const linkToExchangeAccountLoading = (): ProfileActionTypes => ({
  type: AT.LINK_TO_EXCHANGE_ACCOUNT_LOADING
})
export const linkToExchangeAccountSuccess = (): ProfileActionTypes => ({
  type: AT.LINK_TO_EXCHANGE_ACCOUNT_SUCCESS
})
export const linkToExchangeAccountReset = (): ProfileActionTypes => ({
  type: AT.LINK_TO_EXCHANGE_ACCOUNT_RESET
})
export const setApiTokenFailure = (error): ProfileActionTypes => ({
  payload: { error },
  type: AT.SET_API_TOKEN_FAILURE
})
export const setApiTokenLoading = (): ProfileActionTypes => ({
  type: AT.SET_API_TOKEN_LOADING
})
export const setApiTokenNotAsked = (): ProfileActionTypes => ({
  type: AT.SET_API_TOKEN_NOT_ASKED
})
export const setApiTokenSuccess = (token): ProfileActionTypes => ({
  payload: { token },
  type: AT.SET_API_TOKEN_SUCCESS
})

export const setCampaign = (campaign): ProfileActionTypes => ({
  payload: { campaign },
  type: AT.SET_CAMPAIGN
})

export const setLinkToExchangeAccountDeepLink = (deeplink): ProfileActionTypes => ({
  payload: { deeplink },
  type: AT.SET_LINK_TO_EXCHANGE_ACCOUNT_DEEPLINK
})
// event, not used by reducer, not yet typed
export const signIn = (firstLogin) => ({
  payload: { firstLogin },
  type: AT.SIGN_IN
})
export const shareWalletAddressesWithExchange = (): ProfileActionTypes => ({
  type: AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE
})
export const shareWalletAddressesWithExchangeLoading = (): ProfileActionTypes => ({
  type: AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE_LOADING
})
export const shareWalletAddressesWithExchangeSuccess = (data): ProfileActionTypes => ({
  payload: { data },
  type: AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE_SUCCESS
})
export const shareWalletAddressesWithExchangeFailure = (error): ProfileActionTypes => ({
  payload: { error },
  type: AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE_FAILURE
})

export const fetchUserRiskSettings = () => ({
  type: AT.FETCH_USER_RISK_SETTINGS
})
export const fetchUserRiskSettingsFailure = (error: NabuApiErrorType): ProfileActionTypes => ({
  payload: { error },
  type: AT.FETCH_USER_RISK_SETTINGS_FAILURE
})
export const fetchUserRiskSettingsLoading = (): ProfileActionTypes => ({
  type: AT.FETCH_USER_RISK_SETTINGS_LOADING
})
export const fetchUserRiskSettingsSuccess = (userRiskSettings): ProfileActionTypes => ({
  payload: { userRiskSettings },
  type: AT.FETCH_USER_RISK_SETTINGS_SUCCESS
})

export const fetchSofiMigrationStatus = () => ({
  type: AT.FETCH_SOFI_MIGRATION_STATUS
})

export const fetchSofiMigrationStatusLoading = () => ({
  type: AT.FETCH_SOFI_MIGRATION_STATUS_LOADING
})

export const fetchSofiMigrationStatusSuccess = (data) => ({
  payload: data,
  type: AT.FETCH_SOFI_MIGRATION_STATUS_SUCCESS
})

export const fetchSofiMigrationStatusFailure = (error) => ({
  payload: { error },
  type: AT.FETCH_SOFI_MIGRATION_STATUS_FAILURE
})

export const migrateSofiUser = () => ({
  type: AT.MIGRATE_SOFI_USER
})

export const migrateSofiUserLoading = () => ({
  type: AT.MIGRATE_SOFI_USER_LOADING
})

export const migrateSofiUserSuccess = (migrationStatus) => ({
  payload: { migrationStatus },
  type: AT.MIGRATE_SOFI_USER_SUCCESS
})

export const migrateSofiUserFailure = (error) => ({
  payload: { error },
  type: AT.MIGRATE_SOFI_USER_FAILURE
})

export const initiateSofiLanding = () => ({
  type: AT.INITIATE_SOFI_LANDING
})

export const setSofiLinkData = (linkData) => ({
  payload: { linkData },
  type: AT.SET_SOFI_LINK_DATA
})

export const associateSofiUser = () => ({
  type: AT.ASSOCIATE_SOFI_USER
})

export const associateSofiUserLoading = () => ({
  type: AT.ASSOCIATE_SOFI_USER_LOADING
})

export const associateSofiUserSuccess = (boolean) => ({
  payload: { boolean },
  type: AT.ASSOCIATE_SOFI_USER_SUCCESS
})

export const associateSofiUserFailure = (error) => ({
  payload: { error },
  type: AT.ASSOCIATE_SOFI_USER_FAILURE
})

export const fetchSofiUserStatus = () => ({
  type: AT.FETCH_SOFI_USER_STATUS
})

export const setSofiUserStatusFromPolling = (sofiUserStatus) => ({
  payload: { sofiUserStatus },
  type: AT.SET_SOFI_USER_STATUS_FROM_POLLING
})

export const setSofiMigratedBalances = (balances) => ({
  payload: { balances },
  type: AT.SET_SOFI_MIGRATED_BALANCES
})
