import React, { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import { chakra, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { useLocation, useOutlet } from 'react-router-dom'
import { MetaFunction, LinksFunction } from '@remix-run/node'
import { ServerStyleContext, ClientStyleContext } from './context'
import theme from './components/chakra/theme';
import Fonts from './components/chakra/Fonts'
import { AnimatePresence, motion } from 'framer-motion'
import globalCSS from '../styles/globals.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Zdajesz!',
  viewport: 'width=device-width,initial-scale=1',
});

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
    },
    {
      rel: "stylesheet",
      href: globalCSS
    }
  ]
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="pl">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  const outlet = useOutlet();
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <AnimatePresence exitBeforeEnter>
          {/* <motion.main key={useLocation().pathname}> */}
          <chakra.main minH='90vh'>
            {outlet}
          </chakra.main>
          {/* </motion.main> */}
        </AnimatePresence>
        <Fonts />
      </ChakraProvider>
    </Document>
  )
}