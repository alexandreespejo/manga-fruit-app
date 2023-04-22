import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    text: string,
    background: string,
    items: string,
    tint: string,
    tags: string[]
  }
}