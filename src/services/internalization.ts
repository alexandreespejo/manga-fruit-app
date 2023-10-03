import * as Local from 'expo-localization'
import { I18n } from 'i18n-js'

// Set the key-value pairs for the different languages you want to support.
const internalization = new I18n({
  en: {
    languageFilter: 'en',
    headerBackLabel: 'Back',
    homeScreenTitle: 'Home',
    favoriteScreenTitle: 'Favorites',
    //home screen
    homeMostPopular: 'Most Popular',
    homeLastUpdated: 'Last Updated',
    homeLastVisited: 'Last Visited',
    //search screen
    searchInputPlaceholder: 'Search a title',
    searchRequestErrorTitle: 'Fail',
    searchRequestErrorMessage: 'Server problems, please try again later!',
    //chapter screen
    chapterListLabel: 'Chapter',
    chapterFilterConfirm: 'Filter',
    chapterFilterCancel: 'Cancel',
    chapterFilterLanguageLabel: 'Language',
    chapterFilterInitialChapterLabel: 'Initial chapter',
    chapterFilterOrderLabel: 'Order',
    //reader screen
    readerNextPageLabel: 'Next',
    readerPreviousPageLabel: 'Previous',
    //config screen
    configScreenTitle: 'Configuration',
    configShowSuggestionLabel: 'Show Home Suggestions',
    configIsDarkModeLabel: 'Dark Mode',
    configCommunityButton: 'Donations',
  },
  pt: {
    languageFilter: 'pt-br',
    headerBackLabel: 'Voltar',
    homeScreenTitle: 'Inicio',
    favoriteScreenTitle: 'Favoritos',
    //home screen
    homeMostPopular: 'Mais Populares',
    homeLastUpdated: 'Ultimas Atualizações',
    homeLastVisited: 'Ultimos Visitados',
    //search screen
    searchInputPlaceholder: 'Pesquise um titulo',
    searchRequestErrorTitle: 'Falha',
    searchRequestErrorMessage: 'Problemas no servidor, por favor tente novamente mais tarde!',
    //chapter screen
    chapterListLabel: 'Capitulo',
    chapterFilterConfirm: 'Filtrar',
    chapterFilterCancel: 'Cancelar',
    chapterFilterLanguageLabel: 'Linguagem',
    chapterFilterInitialChapterLabel: 'Capitulo inicial',
    chapterFilterOrderLabel: 'Ordem',
    //reader screen
    readerNextPageLabel: 'Próximo',
    readerPreviousPageLabel: 'Anterior',
    //config screen
    configScreenTitle: 'Configurações',
    configShowSuggestionLabel: 'Mostrar Sugestões no Inicio',
    configIsDarkModeLabel: 'Tema Escuro',
    configCommunityButton: 'Doações',
  }
})

const supportedLanguages = ['en', 'pt']

// Set the locale once at the beginning of your app.
const currentLanguageCode = Local.getLocales()[0].languageCode
internalization.locale = supportedLanguages.includes(currentLanguageCode) ? currentLanguageCode : 'en'

export default internalization