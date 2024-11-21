// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: '#4338ca', // indigo-700
//           hover: '#3730a3', // indigo-800
//           light: '#6366f1', // indigo-500
//           dark: '#312e81', // indigo-900
//         },
//         background: {
//           DEFAULT: '#020613', // dark blue
//           paper: '#1a1c2a', // slightly lighter
//         },
//         text: {
//           primary: 'rgba(255, 255, 255, 0.87)',
//           secondary: 'rgba(255, 255, 255, 0.60)',
//         }
//       },
//       spacing: {
//         container: '2rem',
//         header: '4rem',
//       },
//       maxWidth: {
//         'content': '1080px',
//       }
//     },
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D28D9',
          hover: '#7C3AED',
          light: '#8B5CF6',
          dark: '#5B21B6',
        },
        accent: {
          DEFAULT: '#10B981',
          hover: '#059669',
          light: '#34D399',
        },
        background: {
          DEFAULT: '#0F172A',
          paper: '#1E293B',
          card: '#334155',
        },
        text: {
          primary: 'rgba(255, 255, 255, 0.95)',
          secondary: 'rgba(255, 255, 255, 0.75)',
          accent: '#10B981',
        }
      },
      spacing: {
        container: '2rem',
        header: '4rem',
      },
      maxWidth: {
        'content': '1280px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.primary.DEFAULT)',
        'neon-accent': '0 0 5px theme(colors.accent.DEFAULT), 0 0 20px theme(colors.accent.DEFAULT)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.primary.DEFAULT)' },
          '100%': { boxShadow: '0 0 10px theme(colors.primary.DEFAULT), 0 0 30px theme(colors.primary.DEFAULT)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}