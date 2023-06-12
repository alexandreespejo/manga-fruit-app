import Local from 'expo-localization'
import { I18n } from 'i18n-js'

// Set the key-value pairs for the different languages you want to support.
const internalization = new I18n({
  en: { welcome: 'Hello' },
  "pt-br": { welcome: 'こんにちは' },
})

// Set the locale once at the beginning of your app.
// internalization.locale = Local.locale

export default internalization