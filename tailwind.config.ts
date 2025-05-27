import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./writing/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        dark: {
          css: {
            color: '#e5e7eb', // text-gray-200
            '[class~="lead"]': { color: '#d1d5db' }, // text-gray-300
            a: { color: '#93c5fd' }, // blue-300
            strong: { color: '#fff' },
            'ol > li::before': { color: '#9ca3af' }, // gray-400
            'ul > li::before': { backgroundColor: '#6b7280' }, // gray-600
            hr: { borderColor: '#374151' }, // gray-700
            blockquote: {
              color: '#d1d5db',
              borderLeftColor: '#374151', // gray-700
            },
            h1: { color: '#fff' },
            h2: { color: '#fff' },
            h3: { color: '#fff' },
            h4: { color: '#fff' },
            code: { color: '#fbbf24', backgroundColor: '#1f2937' }, // yellow-400, gray-800
            'a code': { color: '#93c5fd' },
            pre: {
              color: '#e5e7eb',
              backgroundColor: '#1f2937', // gray-800
            },
            thead: {
              color: '#fff',
              borderBottomColor: '#4b5563', // gray-600
            },
            tbody: {
              tr: { borderBottomColor: '#374151' }, // gray-700
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
