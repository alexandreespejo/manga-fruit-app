import * as Local from 'expo-localization'
import { I18n } from 'i18n-js'

// Set the key-value pairs for the different languages you want to support.
const internalization = new I18n({
  'en': {
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
    searchNoDataFound: 'No data found', // Added for no data found
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
  'pt': {
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
    searchNoDataFound: 'Nenhum dado encontrado', // Added for no data found
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
  },
  'es': {
    languageFilter: 'es',
    headerBackLabel: 'Volver',
    homeScreenTitle: 'Inicio',
    favoriteScreenTitle: 'Favoritos',
    // Home screen
    homeMostPopular: 'Más Populares',
    homeLastUpdated: 'Últimas Actualizaciones',
    homeLastVisited: 'Últimos Visitados',
    // Search screen
    searchInputPlaceholder: 'Buscar un título',
    searchRequestErrorTitle: 'Error',
    searchRequestErrorMessage: 'Problemas en el servidor, por favor inténtelo de nuevo más tarde',
    searchNoDataFound: 'No se encontraron datos', // Added for no data found
    // Chapter screen
    chapterListLabel: 'Capítulo',
    chapterFilterConfirm: 'Filtrar',
    chapterFilterCancel: 'Cancelar',
    chapterFilterLanguageLabel: 'Idioma',
    chapterFilterInitialChapterLabel: 'Capítulo inicial',
    chapterFilterOrderLabel: 'Orden',
    // Reader screen
    readerNextPageLabel: 'Siguiente',
    readerPreviousPageLabel: 'Anterior',
    // Config screen
    configScreenTitle: 'Configuraciones',
    configShowSuggestionLabel: 'Mostrar sugerencias al inicio',
    configIsDarkModeLabel: 'Modo Oscuro',
    configCommunityButton: 'Donaciones',
  }
}
)

export const languageOptions = {
  'en': [
    { label: 'Portuguese', value: 'pt-br' },
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
  ],
  'pt-br': [
    { label: 'Português', value: 'pt-br' },
    { label: 'Inglês', value: 'en' },
    { label: 'Espanhol', value: 'es' },
  ],
  'es': [
    { label: 'Portugués', value: 'pt-br' },
    { label: 'Inglés', value: 'en' },
    { label: 'Español', value: 'es' },
  ],
}


export const orderOptions = {
  'en': [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ],
  'pt-br': [
    { label: 'Crescente', value: 'asc' },
    { label: 'Decrescente', value: 'desc' },
  ],
  'es': [
    { label: 'Creciente', value: 'asc' },
    { label: 'Decreciente', value: 'desc' },
  ]
}

const supportedLanguages = ['en', 'pt', 'es']

// Set the locale once at the beginning of your app.
const currentLanguageCode = Local.getLocales()[0].languageCode
internalization.locale = supportedLanguages.includes(currentLanguageCode) ? currentLanguageCode : 'en'

export default internalization