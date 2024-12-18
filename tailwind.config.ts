import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e'
        },
        "silver-tree": {
          "50": "#f0f9f4",
          "100": "#dbf0e2",
          "200": "#b9e1c9",
          "300": "#79c29b",
          "400": "#5aad84",
          "500": "#389167",
          "600": "#287352",
          "700": "#205c43",
          "800": "#1b4a37",
          "900": "#173d2e",
          "950": "#0c221a",
        },
        "bunting": {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdafe",
          "300": "#93c4fd",
          "400": "#60a4fa",
          "500": "#3b80f6",
          "600": "#2561eb",
          "700": "#1d4cd8",
          "800": "#1e3faf",
          "900": "#1e398a",
          "950": "#162351",
        },
        "buttercup": {
          "50": "#fffaeb",
          "100": "#fdefc8",
          "200": "#fadd8d",
          "300": "#f8c651",
          "400": "#f6b12d",
          "500": "#ef8f11",
          "600": "#d46a0b",
          "700": "#b04a0d",
          "800": "#8f3911",
          "900": "#753012",
          "950": "#431605",
        },
        "pumpkin": {
          "50": "#fff4ed",
          "100": "#ffe6d5",
          "200": "#feccaa",
          "300": "#fdac74",
          "400": "#fb8a3c",
          "500": "#f97316",
          "600": "#ea670c",
          "700": "#c2570c",
          "800": "#9a4a12",
          "900": "#7c3d12",
          "950": "#432007",
        },
        "cornflower-blue": {
          "50": "#eef4ff",
          "100": "#dae6ff",
          "200": "#bdd3ff",
          "300": "#90b8ff",
          "400": "#6195ff",
          "500": "#3569fc",
          "600": "#1f48f1",
          "700": "#1733de",
          "800": "#192cb4",
          "900": "#1a2a8e",
          "950": "#151c56",
        },
        "coral-red": {
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d",
          "950": "#450a0a",
        },
      }
    }
  }
}
