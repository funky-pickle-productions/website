import units from './assets/units'
import colors from './assets/colors'
let safeList = []

Object.keys(colors).forEach(key => {
  safeList.push(`text-${key}`)
  safeList.push(`bg-${key}`)
  safeList.push(`border-${key}`)
  safeList.push(`marker:text-${key}`)
})

export default{
  mode: "jit",
  purge: {
    content:[
      './components/**/*.vue',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './slices/**/*.vue'
    ],
    safelist:safeList
  },
  theme:{
    screens: {
      "sm-max": "499px",
      "sm": "500px",
      "md-max": "799px",
      "md": "800px",
      "lg": "1000px",
      "xl": '1250px'
    },
    colors: colors,
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      header: ["Saira Extra Condensed", "sans-serif"],
    },
    fill: (theme) => ({
      lime: theme("colors.lime"),
      green: theme("colors.green"),
      pink: theme("colors.pink"),
      black: theme("colors.black"),
      white: theme("colors.white"),
      gray: theme("colors.gray"),
      blue: theme("colors.blue")
    }),
    backgroundPosition: {
      "center-top": "center top",
      "center-bottom": "center top",
    },
    lineHeight: {
      '08': ".8",
      '09': ".9",
      '10':'1',
      '11':'1.1',
      '12':'1.2',
      '13': "1.3",
      '14': "1.4",
      '15':'1.5'
    },
    spacing:{
      "nav-top": "70px",
      "nav-side": "250px",
      "space": "5rem",
      "space-2x": "10rem",
      ...units.px,
      ...units.rem,
      ...units.fraction,
      ...units.character,
      '0': '0px'
    },
    zIndex:{
      'back-2': -2,
      'back-1': -1,
      '10':1,
      '20':2,
      '30':3,
      '40':4,
      '50':5,
      '60':6,
      '70':7,
      '80':8,
      '90':9,
      '100':10,
      'top': 1000
    },
    maxWidth:{
      ...units.px,
      ...units.rem,
      ...units.fraction,
      ...units.character,
      screen:'100vw'
    },
    maxHeight:{
      ...units.px,
      ...units.rem,
      ...units.fraction,
      ...units.character,
      screen:'100vh'
    },
    minWidth:{
      ...units.px,
      ...units.rem,
      ...units.fraction,
      ...units.character,
    },
    minHeight:{
      ...units.px,
      ...units.rem,
      ...units.fraction,
      ...units.character,
    },
    fontSize: {
      ...units.px,
      ...units.rem,
      mobile:'14px',
      desktop:'16px'
    },
    extend:{
      backgroundColor:(theme)=>({
        'white-10': `rgba(${theme('colors.whitergb')},.1)`,
        'black-10': `rgba(${theme('colors.blackrgb')},.1)`,
        'lime-10':  `rgba(${theme('colors.limergb')},.1)`,
        'pink-10': `rgba(${theme('colors.pinkrgb')},.1)`,
        'blue-10': `rgba(${theme('colors.bluergb')},.1)`,
        'white-20': `rgba(${theme('colors.whitergb')},.2)`,
        'black-20': `rgba(${theme('colors.blackrgb')},.2)`,
        'lime-20':  `rgba(${theme('colors.limergb')},.2)`,
        'pink-20': `rgba(${theme('colors.pinkrgb')},.2)`,
        'blue-20': `rgba(${theme('colors.bluergb')},.2)`,
      })
    }
  }
}
