const tintColorLight = "#ee6364"

export type ColorEnum = "text" | "background" | "items" | "tint"

export default {
  light: {
    text: "#2a2a2a",
    background: "#fff",
    items: "#f9f9f9",
    tint: tintColorLight,
    tags: ['#38C98D', '#EBB22C', '#EB2E6A']
  },
  dark: {
    text: "#fff",
    background: "#2a2a2a",
    items: "#414141",
    tint: tintColorLight,
    tags: ['#38C98D', '#EBB22C', '#EB2E6A']
  },
}
