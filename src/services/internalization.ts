import * as Local from 'expo-localization'
import { I18n } from 'i18n-js'

// Set the key-value pairs for the different languages you want to support.
const internalization = new I18n({
  en: {
    languageFilter: 'en',
    //search screen 
    searchInputPlaceholder: 'Search a title',
    searchRequestErrorTitle: 'Fail',
    searchRequestErrorMessage: 'Server problems, please try again later!',
  },
  pt: {
    languageFilter: 'pt-br',
    //search screen 
    searchInputPlaceholder: 'Pesquise um titulo',
    searchRequestErrorTitle: 'Falha',
    searchRequestErrorMessage: 'Problemas no servidor, por favor tente novamente mais tarde!',
  }
})

// Set the locale once at the beginning of your app.
internalization.locale = Local.getLocales()[0].languageCode

export default internalization