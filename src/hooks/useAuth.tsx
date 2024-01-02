import { GoogleSignin, User } from "@react-native-google-signin/google-signin"
import { useState } from "react"
import { Alert, Linking } from "react-native"
import { create } from 'zustand'

type AuthStoreType = {
  authUserInfo?: User
  setAuthUserInfo: (newValue: User | undefined) => void
  customerInfo?: any
  setCustomerInfo: (newValue: any) => void
}

const API_URL = 'https://black-rat-tools-api-ca40dcaaa486.herokuapp.com'
const SUBSCRIPTIONS_MAP = {
  "1M": "https://buy.stripe.com/8wMaEGeJteLq7965ko",
  "12M": "https://buy.stripe.com/5kAcMO9p98n23WUfZ3"
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  authUserInfo: undefined,
  setAuthUserInfo: (newValue) => set(() => ({ authUserInfo: newValue })),
  customerInfo: undefined,
  setCustomerInfo: (newValue) => set(() => ({ customerInfo: newValue })),
}))

const fetchCustomerData = async (email: string): Promise<any> => {
  const response = await fetch(`${API_URL}/search-customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email
    })
  });

  const data = await response.json();
  return data;
}

const cancelSubscriptionById = async (subscription: string): Promise<any> => {
  const response = await fetch(`${API_URL}/cancel-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscription
    })
  });

  const data = await response.json();

  return data;
};

const useGoogleSignin = () => GoogleSignin

export const useAuth = () => {
  const { configure, hasPlayServices, signIn: signInGoogle } = useGoogleSignin()
  const { setAuthUserInfo, authUserInfo, customerInfo, setCustomerInfo } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const isSignedIn = authUserInfo !== undefined
  const userIsPremium = customerInfo?.subscriptionStatus === 'active'

  const updateCustomerInfo = async () => {
    if (!authUserInfo) return

    try {
      setIsLoading(true)
      const customer = await fetchCustomerData(authUserInfo.user.email)
      if (customer?.id && customer?.email === authUserInfo.user.email)
        setCustomerInfo(customer)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async () => {
    configure()
    setIsLoading(true)
    try {
      await hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await signInGoogle();

      if (userInfo) {
        setAuthUserInfo(userInfo)
        const customer = await fetchCustomerData(userInfo.user.email)
        if (customer?.id && customer?.email === userInfo.user.email)
          setCustomerInfo(customer)
      }

    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      Alert.alert(
        'Erro ao Logar',
        JSON.stringify(error, null, 2),
        [
          { text: 'Ok' },
        ]
      )
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await signOut();
      setAuthUserInfo(undefined)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  const manageBilling = async () => {
    if (!customerInfo?.manage_billing_url) return

    Linking.openURL(customerInfo.manage_billing_url)
  }

  const handleSelectSubscription = (subscription: '1M' | '12M') => () => {
    console.log(subscription)
    const planURL = SUBSCRIPTIONS_MAP[subscription]
    Linking.openURL(`${planURL}?prefilled_email=${authUserInfo.user.email}`)
  }

  const cancelSubscription = () => customerInfo && cancelSubscriptionById(customerInfo.subscriptionId)

  return {
    signIn,
    signOut,
    cancelSubscription,
    updateCustomerInfo,
    manageBilling,
    handleSelectSubscription,
    isLoading,
    isSignedIn,
    authUserInfo,
    customerInfo,
    userIsPremium
  }
}