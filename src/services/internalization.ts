import * as Local from 'expo-localization'
import { I18n } from 'i18n-js'

// Set the key-value pairs for the different languages you want to support.
const internalization = new I18n({
  en: {
    languageFilter: 'en',
    headerBackLabel: 'Back',
    homeScreenTitle: 'Home',
    favoriteScreenTitle: 'Favorites',
    //search screen
    searchMostPopular: 'Most Popular',
    searchInputPlaceholder: 'Search a title',
    searchRequestErrorTitle: 'Fail',
    searchRequestErrorMessage: 'Server problems, please try again later!',
    //chapter screen
    chapterListLabel: 'Chapter',
    chapterFilterConfirm: 'Filter',
    chapterFilterCancel: 'Cancel',
    chapterFilterLanguageLabel: 'Language',
    chapterFilterInitialChapterLabel: 'Initial chapter',
    //reader screen
    readerNextPageLabel: 'Next',
    readerPreviousPageLabel: 'Previous',
  },
  pt: {
    languageFilter: 'pt-br',
    headerBackLabel: 'Voltar',
    homeScreenTitle: 'Inicio',
    favoriteScreenTitle: 'Favoritos',
    //search screen 
    searchMostPopular: 'Mais Populares',
    searchInputPlaceholder: 'Pesquise um titulo',
    searchRequestErrorTitle: 'Falha',
    searchRequestErrorMessage: 'Problemas no servidor, por favor tente novamente mais tarde!',
    //chapter screen
    chapterListLabel: 'Capitulo',
    chapterFilterConfirm: 'Filtrar',
    chapterFilterCancel: 'Cancelar',
    chapterFilterLanguageLabel: 'Linguagem',
    chapterFilterInitialChapterLabel: 'Capitulo inicial',
    //reader screen
    readerNextPageLabel: 'Próximo',
    readerPreviousPageLabel: 'Anterior',
  }
})

// Set the locale once at the beginning of your app.
internalization.locale = Local.getLocales()[0].languageCode

export default internalization