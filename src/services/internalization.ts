import * as Local from 'expo-localization'
import { I18n } from 'i18n-js'

// Set the key-value pairs for the different languages you want to support.
const internalization = new I18n({
  'en': {
    languageFilter: 'en',
    headerBackLabel: 'Back',
    homeScreenTitle: 'Home',
    favoriteScreenTitle: 'Favorites',
    // Home screen
    homeMostPopular: 'Most Popular',
    homeLastUpdated: 'Last Updated',
    homeLastVisited: 'Last Visited',
    // Search screen
    searchInputPlaceholder: 'Search a title',
    searchRequestErrorTitle: 'Fail',
    searchRequestErrorMessage: 'Server problems, please try again later!',
    searchNoDataFound: 'No data found', // Added for no data found
    // Chapter screen
    chapterListLabel: 'Chapter',
    chapterFilterConfirm: 'Filter',
    chapterFilterCancel: 'Cancel',
    chapterFilterLanguageLabel: 'Language',
    chapterFilterInitialChapterLabel: 'Initial chapter',
    chapterFilterOrderLabel: 'Order',
    // Reader screen
    readerNextPageLabel: 'Next',
    readerPreviousPageLabel: 'Previous',
    // Config screen
    configScreenTitle: 'Configuration',
    configShowSuggestionLabel: 'Show Home Suggestions',
    configIsDarkModeLabel: 'Dark Mode',
    configIsVerticalModeLabel: 'Vertical reading',
    configLoadPagesOnceLabel: 'Load Pages at Once',
    configCommunityButton: 'Donations',
    becomePremium: 'Become Premium', // Added missing key
    becomePremiumDescription: 'Get rid of ads and access exclusive features for subscribers.', // Added missing key
    month: 'Month', // Added missing key
    year: 'Year', // Added missing key
    manageSubButtonText: 'Manage Subscription', // Replicated from pt
    updateButtonText: 'Update', // Replicated from pt
    logoutButtonText: 'Logout', // Replicated from pt
  },
  'pt': {
    languageFilter: 'pt-br',
    headerBackLabel: 'Voltar',
    homeScreenTitle: 'Inicio',
    favoriteScreenTitle: 'Favoritos',
    // Home screen
    homeMostPopular: 'Mais Populares',
    homeLastUpdated: 'Ultimas Atualizações',
    homeLastVisited: 'Ultimos Visitados',
    // Search screen
    searchInputPlaceholder: 'Pesquise um titulo',
    searchRequestErrorTitle: 'Falha',
    searchRequestErrorMessage: 'Problemas no servidor, por favor tente novamente mais tarde!',
    searchNoDataFound: 'Nenhum dado encontrado', // Added for no data found
    // Chapter screen
    chapterListLabel: 'Capitulo',
    chapterFilterConfirm: 'Filtrar',
    chapterFilterCancel: 'Cancelar',
    chapterFilterLanguageLabel: 'Linguagem',
    chapterFilterInitialChapterLabel: 'Capitulo inicial',
    chapterFilterOrderLabel: 'Ordem',
    // Reader screen
    readerNextPageLabel: 'Próximo',
    readerPreviousPageLabel: 'Anterior',
    // User screen
    configScreenTitle: 'Configurações',
    configShowSuggestionLabel: 'Mostrar Sugestões no Inicio',
    configIsDarkModeLabel: 'Tema Escuro',
    configIsVerticalModeLabel: 'Leitura Vertical',
    configLoadPagesOnceLabel: 'Carregar Páginas de Uma Vez',
    configCommunityButton: 'Doações',
    becomePremium: 'Virar Premium',
    becomePremiumDescription: 'Fique livre dos anúncios e tenha acesso a funções exclusivas para assinantes.',
    month: 'Mês',
    year: 'Ano',
    manageSubButtonText: 'Minha Assinatura', // Added missing key
    updateButtonText: 'Atualizar', // Added missing key
    logoutButtonText: 'Deslogar', // Added missing key
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
    configIsVerticalModeLabel: 'Lectura vertical',
    configLoadPagesOnceLabel: 'Cargar páginas a la vez',
    configCommunityButton: 'Donaciones',
    becomePremium: 'Hacerse Premium', // Added missing key
    becomePremiumDescription: 'Libérate de los anuncios y accede a funciones exclusivas para suscriptores.', // Added missing key
    month: 'Mes', // Added missing key
    year: 'Año', // Added missing key
    manageSubButtonText: 'Gestionar Suscripción', // Replicated from pt
    updateButtonText: 'Actualizar', // Replicated from pt
    logoutButtonText: 'Cerrar sesión', // Replicated from pt
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