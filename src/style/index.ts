import { ChakraTheme, extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      'html, body, #__next': {
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        "*::-webkit-scrollbar": {
          display: "none"
        }
      },
    },
  },
  colors: {
    primary: {
      default: "#e06108",
      50: "#fde1ce",
      100: "#fbba8c",
      200: "#faa66b",
      300: "#f9924a",
      400: "#f77e2a",
      500: "#f66b09",
      600: "#d55c08",
      700: "#b54e06",
      800: "#733204",
      900: "#311502",
    }
  },
  components: {
    Button: {
      baseStyle: {
        boxShadow: 'none',
        '&:hover, &:focus': {
          boxShadow: 'none',
        },
      },
    },
  },
} as Partial<ChakraTheme>);

export default theme;
