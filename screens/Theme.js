
import { extendTheme } from 'native-base'

const customTheme = extendTheme({
    fontConfig: {
      Lato: {
        100: {
          normal: 'Lato-Thin',
          italic: 'Lato-ThinItalic',
        },
        200: {
          normal: 'Lato-Light',
          italic: 'Lato-LightItalic',
        },
        300: {
          normal: 'Lato-Light',
          italic: 'Lato-LightItalic',
        },
        400: {
          normal: 'Lato-Black',
          italic: 'Lato-BlackItalic',
        },
        500: {
          normal: 'Lato-Bold',
          italic: 'Lato-Italic'
        },
        600: {
          normal: 'Lato-Bold',
          italic: 'Lato-BoldItalic',
        },
      },
    },
  
    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: 'Lato-Bold',
      body: 'Lato-Black',
      mono: 'Lato-Thin',
    },

    colors: {
      green: {
        500: '#81B29A'
      },
      cream: {
        500: '#F4F1DE'
      },
      orange: {
        500: '#E07A5F'
      }
    }
});

export default customTheme